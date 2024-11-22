import axios from "axios";
export async function featchUser() {
  const token =  localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios
      .get("https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/user/own", {
        headers: {
          "authorization": token,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        reject({ error });
      });
  });
}
export async function updateUser({userData}) {
  const token =  localStorage.getItem('token')
  console.log(userData)
  return new Promise((resolve, reject) => {
    axios
      .patch("https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/user/update",userData, {
        headers: {
          "authorization": token,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        resolve({ data });
      })
      .catch((error) => {
        reject({ error });
      });
  });
}
// export  function  featchBlogeById(id){
//     console.log(id)
//   return new Promise( async(resolve, reject) => {
//   await axios.get("https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/"+id).then((res) => {
//       resolve({ data: res.data })
//     }).catch((error) => {
//       reject({ error })
//     })
//   })
// }
