// import { createReducer, on } from '@ngrx/store';
// import { loginFn } from './user.actions';
// import { HttpClient, } from '@angular/common/http';

// export const initialState = "";

// const http : HttpClient;

// export const userReducer = createReducer(
//   initialState,
//   on(
//     loginFn,
//     (state: any) => http
//         .post<any>(
//           'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzBCPpGlVjQ2JvPfgl2-EpqmcX8MIxHGU',
//           credentials
//         )
//         .subscribe({
//           next: (res) => {
//             this.JWT_token = res.idToken;
//             localStorage.setItem('token', this.JWT_token);
//             this.isLoggedInVar = localStorage.getItem('token');
//             this.isLoggedIn();
//             this.router.navigate(['/']);
//           },
//           error: (err) => console.log(err),
//           complete: () => console.log('complete'),
//         });
//   )
// );
