'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MyEarningsGig, PaymentStatus } from '@/lib/types/shared';
import { updatePaymentStatus } from '@/lib/api/money';
import { format } from 'date-fns';
import { AlertCircle, Check } from 'lucide-react';
import { toast } from 'sonner';

function getStatusBadge(status: PaymentStatus) {
  switch (status) {
    case 'paid':
      return <Badge variant="default" className="bg-green-600">Paid</Badge>;
    case 'partial':
      return <Badge variant="secondary">Partial</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="outline">Pending</Badge>;
  }
}

export function MyEarningsTable({ gigs }: { gigs: MyEarningsGig[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const markAsPaidMutation = useMutation({
    mutationFn: updatePaymentStatus,
    onSuccess: () => {
      toast.success('Marked as paid');
      queryClient.invalidateQueries({ 
        queryKey: ['my-earnings'],
        refetchType: 'active'
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update payment status');
    },
  });

  const handleMarkAsPaid = (gig: MyEarningsGig) => {
    markAsPaidMutation.mutate({
      gigRoleId: gig.gigRoleId,
      paymentStatus: 'paid',
      paidAmount: gig.feeAmount || 0,
      paidDate: new Date().toISOString().split('T')[0],
    });
  };

  if (gigs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm text-muted-foreground">
          No gigs found for the selected period
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Gig</TableHead>
            <TableHead>Band/Project</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid Amount</TableHead>
            <TableHead>Paid Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gigs.map((gig) => (
            <TableRow
              key={gig.gigRoleId}
              className={gig.paymentStatus === 'overdue' ? 'bg-red-50' : ''}
            >
              <TableCell>{format(new Date(gig.date), 'MMM d, yyyy')}</TableCell>
              <TableCell 
                className="font-medium text-primary hover:underline cursor-pointer"
                onClick={() => router.push(`/gigs/${gig.gigId}?from=money`)}
              >
                {gig.gigTitle}
              </TableCell>
              <TableCell>{gig.projectName}</TableCell>
              <TableCell>{gig.roleName}</TableCell>
              <TableCell>{gig.locationName || '—'}</TableCell>
              <TableCell className="text-right">
                {gig.feeAmount ? `₪${gig.feeAmount.toFixed(2)}` : '—'}
              </TableCell>
              <TableCell>
                {gig.paymentStatus === 'overdue' && (
                  <AlertCircle className="inline-block mr-1 h-4 w-4 text-red-600" />
                )}
                {getStatusBadge(gig.paymentStatus)}
              </TableCell>
              <TableCell>
                {gig.paidAmount ? `₪${gig.paidAmount.toFixed(2)}` : '—'}
              </TableCell>
              <TableCell>
                {gig.paidDate ? format(new Date(gig.paidDate), 'MMM d, yyyy') : '—'}
              </TableCell>
              <TableCell>
                {gig.paymentStatus !== 'paid' ? (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleMarkAsPaid(gig)}
                    disabled={markAsPaidMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Paid
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

