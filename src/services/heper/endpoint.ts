// export const Endpoint ={
// auth:{
//     login:"/auth/login",
//     register :"/auth/register"
// },
// admin:{
//     category:{
//         global:"/admin/categories",
//         public:"/categories"
//     },
//     news:{
//         global:"/news",
//         adminNews:"/admin/news",
//         list:"/news"
//     },
//     users:{
//         list:"/admin/users",
//         add:"/auth/register"
//     }
// }
// }

export const Endpoint = {
  // Authentication Endpoints
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    profile: "/auth/profile",
  },

  categories: {
    // Public / User
    list: "/categories",
    details: (identifier: string) => `/categories/${identifier}`,
    create: "/categories/admin/create", 
    update: (id: string) => `/categories/admin/update/${id}`,
    delete: (id: string) => `/categories/admin/delete/${id}`,
  },
cars: {
    list: "/cars",
    details: (identifier: string) => `/cars/${identifier}`,
    create: "/cars/admin/create",
    update: (id: string) => `/cars/admin/update/${id}`,
    delete: (id: string) => `/cars/admin/delete/${id}`,
  },
  

  // Bookings Endpoints
  bookings: {
    create: "/bookings/create",
    myBookings: "/bookings/my-bookings",
    adminAll: "/bookings/admin/all",
    adminStatus: (id: string) => `/bookings/admin/status/${id}`,
  },
} as const;

export default Endpoint;