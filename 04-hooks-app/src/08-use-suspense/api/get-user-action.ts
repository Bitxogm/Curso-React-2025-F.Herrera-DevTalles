
export interface USer {
  id: number,
  name: string,
  loacation: string,
  role: string,
}

export const getUserAction = async (id: number) => {
   console.log('Call function')
   await new Promise((res) => setTimeout(res, 2000));
   console.log('Resolve function')

  return {
    id,
    name: 'Otaku',
    loacation: 'Ontario',
    role: 'Owner',
  };

};
