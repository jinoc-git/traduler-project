import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

import { supabase } from './supabaseAuth';

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

  return pathList;
};
