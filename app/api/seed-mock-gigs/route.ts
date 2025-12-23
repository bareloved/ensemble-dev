/**
 * API route to seed mock gigs with comprehensive test data
 * 
 * Call this once: GET /api/seed-mock-gigs
 * 
 * This creates 5 gigs with:
 * - All gig fields filled (title, date, times, location, status, notes, schedule)
 * - Multiple gig roles with different statuses
 * - Setlist items with keys, BPM, and notes
 * - Gig files (charts, audio references, documents)
 */

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

interface MockGig {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  status: 'draft' | 'confirmed';
  notes: string;
  schedule: string;
  roles: Array<{
    roleName: string;
    musicianId?: string | null;
    invitationStatus: string;
    agreedFee: number;
    currency: string;
    paymentStatus: string;
    notes?: string | null;
  }>;
  setlist: Array<{
    position: number;
    title: string;
    key: string | null;
    bpm: number | null;
    notes: string | null;
  }>;
  files: Array<{
    label: string;
    type: string;
    url: string;
  }>;
}

const mockGigs: MockGig[] = [
  {
    title: "Sarah & Michael's Wedding Reception",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '18:00:00',
    endTime: '23:00:00',
    locationName: 'Grand Ballroom, The Plaza Hotel',
    locationAddress: '768 5th Ave, New York, NY 10019',
    status: 'confirmed',
    notes: 'Black tie event. Client requested jazz standards for cocktail hour, then upbeat dance music for reception. Soundcheck at 17:00. Bring extra cables and backup equipment.',
    schedule: '17:00 - Load-in and setup\n17:30 - Soundcheck\n18:00 - Cocktail hour (jazz standards)\n19:30 - Dinner service (background music)\n21:00 - First dance and party set\n23:00 - Breakdown',
    roles: [
      { roleName: 'Keys', invitationStatus: 'accepted', agreedFee: 500, currency: 'USD', paymentStatus: 'pending', notes: 'Bring Nord Stage 3' },
      { roleName: 'Bass', invitationStatus: 'accepted', agreedFee: 450, currency: 'USD', paymentStatus: 'pending' },
      { roleName: 'Drums', invitationStatus: 'invited', agreedFee: 450, currency: 'USD', paymentStatus: 'pending', notes: 'Need subkick' },
      { roleName: 'Guitar', invitationStatus: 'accepted', agreedFee: 400, currency: 'USD', paymentStatus: 'paid' },
      { roleName: 'Vocals', invitationStatus: 'tentative', agreedFee: 350, currency: 'USD', paymentStatus: 'pending', notes: 'Waiting for confirmation' },
    ],
    setlist: [
      { position: 1, title: 'At Last', key: 'Eb', bpm: 72, notes: 'First dance song' },
      { position: 2, title: 'Fly Me to the Moon', key: 'C', bpm: 120, notes: 'Cocktail hour' },
      { position: 3, title: 'The Way You Look Tonight', key: 'F', bpm: 100, notes: null },
      { position: 4, title: 'September', key: 'Bb', bpm: 126, notes: 'Dance floor opener' },
      { position: 5, title: 'Uptown Funk', key: 'Dm', bpm: 115, notes: null },
      { position: 6, title: 'Shake It Off', key: 'C', bpm: 160, notes: null },
      { position: 7, title: "I Wanna Dance with Somebody", key: 'G', bpm: 120, notes: null },
      { position: 8, title: 'Billie Jean', key: 'F#m', bpm: 117, notes: null },
      { position: 9, title: 'Sweet Caroline', key: 'A', bpm: 110, notes: 'Crowd favorite' },
      { position: 10, title: "Don't Stop Believin'", key: 'E', bpm: 118, notes: 'Finale' },
    ],
    files: [
      { label: 'Wedding Setlist Chart', type: 'chart', url: 'https://example.com/charts/wedding-setlist.pdf' },
      { label: 'At Last - Lead Sheet', type: 'chart', url: 'https://example.com/charts/at-last.pdf' },
      { label: 'September - Reference Audio', type: 'audio_ref', url: 'https://example.com/audio/september.mp3' },
      { label: 'Venue Layout', type: 'other', url: 'https://example.com/docs/plaza-ballroom-layout.pdf' },
    ],
  },
  {
    title: 'Summer Jazz Festival - Main Stage',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '20:00:00',
    endTime: '22:30:00',
    locationName: 'Central Park SummerStage',
    locationAddress: 'Rumsey Playfield, Central Park, New York, NY',
    status: 'confirmed',
    notes: 'Outdoor festival performance. Weather backup plan in place. Full PA provided. Arrive early for line check. This is our biggest gig of the summer!',
    schedule: '16:00 - Load-in\n17:00 - Line check\n18:00 - Soundcheck\n19:30 - Doors open\n20:00 - Performance starts\n22:30 - Performance ends\n23:00 - Breakdown',
    roles: [
      { roleName: 'Keys', invitationStatus: 'accepted', agreedFee: 600, currency: 'USD', paymentStatus: 'pending' },
      { roleName: 'Bass', invitationStatus: 'accepted', agreedFee: 550, currency: 'USD', paymentStatus: 'pending' },
      { roleName: 'Drums', invitationStatus: 'accepted', agreedFee: 550, currency: 'USD', paymentStatus: 'pending' },
      { roleName: 'Saxophone', invitationStatus: 'accepted', agreedFee: 500, currency: 'USD', paymentStatus: 'pending' },
    ],
    setlist: [
      { position: 1, title: 'Blue Moon', key: 'F', bpm: 120, notes: null },
      { position: 2, title: 'Autumn Leaves', key: 'Em', bpm: 140, notes: null },
      { position: 3, title: 'Take Five', key: 'Eb', bpm: 176, notes: '5/4 time' },
      { position: 4, title: 'So What', key: 'Dm', bpm: 150, notes: 'Modal jazz' },
      { position: 5, title: 'All of Me', key: 'C', bpm: 120, notes: null },
      { position: 6, title: 'Summertime', key: 'Am', bpm: 100, notes: null },
      { position: 7, title: 'Blue Train', key: 'C', bpm: 180, notes: 'Up-tempo' },
      { position: 8, title: 'Round Midnight', key: 'Eb', bpm: 60, notes: 'Ballad' },
    ],
    files: [
      { label: 'Festival Setlist', type: 'chart', url: 'https://example.com/charts/festival-setlist.pdf' },
      { label: 'Take Five - Chart', type: 'chart', url: 'https://example.com/charts/take-five.pdf' },
      { label: 'Sound Requirements', type: 'other', url: 'https://example.com/docs/festival-sound-specs.pdf' },
    ],
  },
  {
    title: 'Corporate Holiday Party - Tech Company',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '19:00:00',
    endTime: '01:00:00',
    locationName: 'Metropolitan Pavilion',
    locationAddress: '125 W 18th St, New York, NY 10011',
    status: 'draft',
    notes: 'Corporate event for 500+ people. Mix of background music during dinner and high-energy dance music after 21:00. Client wants a mix of current hits and 80s/90s classics.',
    schedule: '17:00 - Load-in\n18:00 - Soundcheck\n19:00 - Cocktail hour (background music)\n20:00 - Dinner service\n21:00 - Party set begins\n01:00 - Event ends',
    roles: [
      { roleName: 'Keys', invitationStatus: 'pending', agreedFee: 800, currency: 'USD', paymentStatus: 'pending' },
      { roleName: 'Bass', invitationStatus: 'pending', agreedFee: 700, currency: 'USD', paymentStatus: 'pending', notes: 'Need to assign' },
      { roleName: 'Drums', invitationStatus: 'pending', agreedFee: 700, currency: 'USD', paymentStatus: 'pending', notes: 'Need to assign' },
      { roleName: 'Guitar', invitationStatus: 'pending', agreedFee: 650, currency: 'USD', paymentStatus: 'pending', notes: 'Need to assign' },
      { roleName: 'Vocals', invitationStatus: 'invited', agreedFee: 600, currency: 'USD', paymentStatus: 'pending' },
    ],
    setlist: [
      { position: 1, title: 'Dancing Queen', key: 'A', bpm: 118, notes: null },
      { position: 2, title: 'Sweet Dreams', key: 'Am', bpm: 120, notes: null },
      { position: 3, title: 'Billie Jean', key: 'F#m', bpm: 117, notes: null },
      { position: 4, title: "Livin' on a Prayer", key: 'B', bpm: 122, notes: null },
      { position: 5, title: "Don't Stop Believin'", key: 'E', bpm: 118, notes: null },
      { position: 6, title: 'Uptown Funk', key: 'Dm', bpm: 115, notes: null },
      { position: 7, title: 'Shake It Off', key: 'C', bpm: 160, notes: null },
      { position: 8, title: 'Blinding Lights', key: 'Dm', bpm: 171, notes: null },
    ],
    files: [
      { label: 'Corporate Setlist', type: 'chart', url: 'https://example.com/charts/corporate-setlist.pdf' },
      { label: 'Client Song Requests', type: 'other', url: 'https://example.com/docs/client-requests.pdf' },
    ],
  },
  {
    title: 'Intimate Jazz Club Performance',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '21:00:00',
    endTime: '23:30:00',
    locationName: 'Blue Note Jazz Club',
    locationAddress: '131 W 3rd St, New York, NY 10012',
    status: 'confirmed',
    notes: 'Intimate venue, acoustic set preferred. House sound system. Two 45-minute sets with 15-minute break.',
    schedule: '20:00 - Arrival\n20:30 - Soundcheck\n21:00 - First set\n21:45 - Break\n22:00 - Second set\n23:30 - End',
    roles: [
      { roleName: 'Keys', invitationStatus: 'accepted', agreedFee: 300, currency: 'USD', paymentStatus: 'pending' },
      { roleName: 'Bass', invitationStatus: 'accepted', agreedFee: 250, currency: 'USD', paymentStatus: 'pending' },
      { roleName: 'Drums', invitationStatus: 'accepted', agreedFee: 250, currency: 'USD', paymentStatus: 'pending' },
    ],
    setlist: [
      { position: 1, title: 'Misty', key: 'Eb', bpm: 100, notes: 'First set' },
      { position: 2, title: 'The Girl from Ipanema', key: 'D', bpm: 120, notes: null },
      { position: 3, title: 'Blue in Green', key: 'Am', bpm: 80, notes: 'Ballad' },
      { position: 4, title: 'All Blues', key: 'G', bpm: 140, notes: null },
      { position: 5, title: 'Stella by Starlight', key: 'Bb', bpm: 110, notes: 'Second set' },
      { position: 6, title: 'My Funny Valentine', key: 'Em', bpm: 70, notes: 'Ballad' },
      { position: 7, title: 'Autumn Leaves', key: 'Em', bpm: 140, notes: null },
    ],
    files: [
      { label: 'Jazz Standards Setlist', type: 'chart', url: 'https://example.com/charts/jazz-standards.pdf' },
      { label: 'Misty - Chart', type: 'chart', url: 'https://example.com/charts/misty.pdf' },
    ],
  },
  {
    title: 'Private Birthday Celebration',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    startTime: '19:30:00',
    endTime: '23:00:00',
    locationName: 'Private Residence - Upper East Side',
    locationAddress: 'Address provided upon confirmation',
    status: 'confirmed',
    notes: "Private home event. Small setup required. Client's favorite genres: Motown, soul, and contemporary R&B. Birthday person loves Stevie Wonder.",
    schedule: '18:00 - Load-in\n18:30 - Setup\n19:00 - Soundcheck\n19:30 - Guests arrive, background music\n20:30 - Dinner\n21:30 - Birthday celebration set\n23:00 - Event ends',
    roles: [
      { roleName: 'Keys', invitationStatus: 'accepted', agreedFee: 400, currency: 'USD', paymentStatus: 'paid' },
      { roleName: 'Bass', invitationStatus: 'accepted', agreedFee: 350, currency: 'USD', paymentStatus: 'paid' },
      { roleName: 'Drums', invitationStatus: 'accepted', agreedFee: 350, currency: 'USD', paymentStatus: 'paid' },
      { roleName: 'Guitar', invitationStatus: 'accepted', agreedFee: 300, currency: 'USD', paymentStatus: 'paid' },
    ],
    setlist: [
      { position: 1, title: 'Superstition', key: 'Eb', bpm: 100, notes: "Birthday person's favorite" },
      { position: 2, title: 'Signed, Sealed, Delivered', key: 'F', bpm: 120, notes: null },
      { position: 3, title: "Isn't She Lovely", key: 'A', bpm: 100, notes: null },
      { position: 4, title: "Ain't No Mountain High Enough", key: 'F', bpm: 120, notes: null },
      { position: 5, title: 'Respect', key: 'Db', bpm: 110, notes: null },
      { position: 6, title: 'I Heard It Through the Grapevine', key: 'Gm', bpm: 120, notes: null },
      { position: 7, title: "Let's Stay Together", key: 'F', bpm: 100, notes: null },
      { position: 8, title: 'Happy Birthday', key: 'C', bpm: 100, notes: 'Special arrangement' },
    ],
    files: [
      { label: 'Motown Setlist', type: 'chart', url: 'https://example.com/charts/motown-setlist.pdf' },
      { label: 'Superstition - Chart', type: 'chart', url: 'https://example.com/charts/superstition.pdf' },
      { label: 'Superstition - Reference', type: 'audio_ref', url: 'https://example.com/audio/superstition.mp3' },
    ],
  },
];

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🚀 Starting mock gig insertion...\n');

    const ownerId = user.id;

    // Get available users for roles
    const { data: users } = await supabase
      .from('profiles')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(5);

    const userIds = users?.map(u => u.id) || [];

    // Get or create contacts
    const { data: contacts } = await supabase
      .from('musician_contacts')
      .select('id')
      .eq('user_id', ownerId)
      .limit(2);

    let contactIds = contacts?.map(c => c.id) || [];
    
    // Create contacts if needed
    if (contactIds.length < 2) {
      const newContacts = [
        { user_id: ownerId, contact_name: 'Alex Drummer', email: 'alex@example.com', primary_instrument: 'Drums', status: 'active_user' },
        { user_id: ownerId, contact_name: 'Jordan Bass', email: 'jordan@example.com', primary_instrument: 'Bass', status: 'active_user' },
      ];
      
      for (const contact of newContacts.slice(contactIds.length)) {
        const { data: newContact } = await supabase
          .from('musician_contacts')
          .insert(contact)
          .select('id')
          .single();
        if (newContact) contactIds.push(newContact.id);
      }
    }

    const allMusicianIds = [...userIds, ...contactIds];
    let musicianIndex = 0;
    const results = [];

    // Insert each gig
    for (const mockGig of mockGigs) {
      // Insert gig
      const { data: gig, error: gigError } = await supabase
        .from('gigs')
        .insert({
          owner_id: ownerId,
          title: mockGig.title,
          date: mockGig.date,
          start_time: mockGig.startTime,
          end_time: mockGig.endTime,
          location_name: mockGig.locationName,
          location_address: mockGig.locationAddress,
          status: mockGig.status,
          notes: mockGig.notes,
          schedule: mockGig.schedule,
        })
        .select('id')
        .single();

      if (gigError || !gig) {
        console.error(`Error creating gig ${mockGig.title}:`, gigError);
        continue;
      }

      const gigId = gig.id;

      // Insert roles
      for (const role of mockGig.roles) {
        const musicianId = role.musicianId !== undefined 
          ? role.musicianId 
          : (allMusicianIds.length > 0 ? allMusicianIds[musicianIndex % allMusicianIds.length] : null);
        
        if (role.musicianId === undefined && musicianId) {
          musicianIndex++;
        }

        await supabase.from('gig_roles').insert({
          gig_id: gigId,
          role_name: role.roleName,
          musician_id: musicianId,
          invitation_status: role.invitationStatus,
          agreed_fee: role.agreedFee,
          currency: role.currency,
          payment_status: role.paymentStatus,
          notes: role.notes || null,
        });
      }

      // Insert setlist items
      for (const item of mockGig.setlist) {
        await supabase.from('setlist_items').insert({
          gig_id: gigId,
          position: item.position,
          title: item.title,
          key: item.key,
          bpm: item.bpm,
          notes: item.notes,
        });
      }

      // Insert files
      for (const file of mockGig.files) {
        await supabase.from('gig_files').insert({
          gig_id: gigId,
          label: file.label,
          type: file.type,
          url: file.url,
        });
      }

      results.push({
        gigId,
        title: mockGig.title,
        roles: mockGig.roles.length,
        setlistItems: mockGig.setlist.length,
        files: mockGig.files.length,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully inserted all mock gigs!',
      summary: {
        totalGigs: mockGigs.length,
        totalRoles: mockGigs.reduce((sum, g) => sum + g.roles.length, 0),
        totalSetlistItems: mockGigs.reduce((sum, g) => sum + g.setlist.length, 0),
        totalFiles: mockGigs.reduce((sum, g) => sum + g.files.length, 0),
      },
      results,
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


