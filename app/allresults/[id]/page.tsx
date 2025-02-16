import { createClient } from '@/utils/supabase/client';
import React from 'react';

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase.from('blood_sugar').select('*').limit(1);

  if (error) {
    console.log('Error:', error);
  } else if (data.length === 0) {
    console.log('No data found');
  } else {
    console.log('Data:', data);
  }

  return (
    <div className='bg-cyan-300'>
      hello
    </div>
  );
}