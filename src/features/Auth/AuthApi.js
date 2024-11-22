import axios from "axios";
export function LogiUser(userdata) {
    return new Promise((resolve, reject) => {
        axios.get("https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/auth/login",userdata)
            .then((res) =>console.log(res.data))
            .then((data) => {
                resolve({ data });
            })
            .catch((error) => {
                reject({ error });
            });
    });
}
export function SignInUser({userdata}) {
    return new Promise((resolve, reject) => {
        axios.post("https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/auth/signup",userdata)
            .then((res) =>res.data._id)
            .then((data) => {
                resolve({ data });
            })
            .catch((error) => {
                reject({ error });
            });
    });
}
export function checkUser() {
    const token = localStorage.getItem("token")
    return new Promise((resolve, reject) => {
        axios.get("https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/auth/check",{
            headers: {
                "authorization": token,
              },
        },{ withCredentials: true })
            
            .then((res) =>res.data)
            .then((data) => {
                resolve({ data });
            })
            .catch((error) => {
                console.log(error.message)
                reject({ error });
            });
    });
}