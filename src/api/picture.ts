import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

import { supabase } from './supabaseAuth';

// const imageUrl = URL.createObjectURL();

export const addPicture = async (fileList: File[], planId: string) => {
  const pathList: string[] = [];

  for (const file of fileList) {
    const { data } = await supabase.storage
      .from('add-photo')
      .upload(`${planId}/${uuid()}`, file);

    if (data !== null) {
      const URL = `${
        process.env.REACT_APP_SB_STORAGE_URL as string
      }/add-photo/${data.path}`;
      pathList.push(URL);
    }
  }

  const { data, error } = await supabase
    .from('plans')
    .update({ pictures: pathList })
    .eq('id', planId)
    .select();

  if (data !== null) {
    console.log('Pictures added to plan:', data);
  }

  if (error != null) {
    console.error('Error updating pictures:', error);
  }
};
