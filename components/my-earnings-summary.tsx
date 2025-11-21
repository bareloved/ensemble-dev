'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MyEarningsSummary } from '@/lib/types/shared';

export function MyEarningsSummaryCards({ summary }: { summary: MyEarningsSummary }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Unpaid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            ₪{(summary.unpaidGross || 0).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Paid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ₪{(summary.paidGross || 0).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₪{(summary.thisMonthGross || 0).toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

