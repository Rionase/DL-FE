import { useAuthStore } from "../store/AuthStore"

// HANDLE SUDAH LOGIN / BLM
// BLOCK PAGE YG TIDAK SESUAI ROLE

export default async function WithRoles(to, from, next, roles) {
    const authStore = useAuthStore();

    // REDIRECT KE PAGE LOGIN APABILA BELUM LOGIN
    if ( !localStorage.getItem("jwt_token")) {
        authStore.logout()
        next("/login");
        return true;
    } 
    else if ( !authStore.role && localStorage.getItem("jwt_token") ) {
        await authStore.getMe()
    }
    // REDIRECT KE PAGE NOT-FOUND APABILA USER MENGAKSES PAGE YANG TIDAK DIPERBOLEHKAN UNTUK ROLES TERSEBUT
    else if ( !roles.includes(authStore.role) ) {
        next("/not-found")
        return true;
    }
    // APABILA USER MEMILIKI HAK UTK MENGAKSES PAGE TSB ( GUARD DARI FE ), MAKA LANJUT KE MIDDLEWARE SELANJUTNYA
    return false;

}