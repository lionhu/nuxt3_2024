export const queryUserInfo = `
  query getUser($uId: ID!) {
    usersPermissionsUser(id: $uId) {
      data {
        id
        attributes {
          username
          profile {
            data {
              id
              attributes {
                avatar {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          role {
            data {
              attributes {
                name
              }
            }
          }
          client {
            data {
              id
              attributes {
                name
                extra_info
                admin {
                  data {
                    id
                    attributes {
                      username
                    }
                  }
                }
              }
            }
          }
          driver {
            data {
              id
              attributes {
                sex
                name
                rate
                wechat {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                driver_license {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                balance
                balanceAt
                phone
                memberUntilAt
                confirmed
                drivership {
                  data {
                    id
                    attributes {
                      name
                      privilege
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
export const getUserByUserSlug = `
  query checkPID($slug: StringFilterInput!) {
    usersPermissionsUsers(filters: { slug: $slug }) {
      data {
        id
        attributes {
          username
        }
      }
    }
  } # W
`

// export const mutationUserProfile = gql`
//   mutation updateProfile($id: ID!, $data: ProfileInput!) {
//     updateProfile(id: $id, data: $data) {
//       data {
//         id
//       }
//     }
//   }
// `
// export const mutationUserInfo = gql`
//   mutation updateProfile($id: ID!, $data: UsersPermissionsUserInput!) {
//     updateUsersPermissionsUser(id: $id, data: $data) {
//       data {
//         id
//       }
//     }
//   }
// `
// export const queryUserInfo = gql`
//   query getUser($uId: ID!) {
//     usersPermissionsUser(id: $uId) {
//       data {
//         id
//         attributes {
//           username
//           profile {
//             data {
//               id
//               attributes {
//                 avatar {
//                   data {
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//           role {
//             data {
//               attributes {
//                 name
//               }
//             }
//           }
//           client {
//             data {
//               id
//               attributes {
//                 name
//                 extra_info
//                 admin {
//                   data {
//                     id
//                     attributes {
//                       username
//                     }
//                   }
//                 }
//               }
//             }
//           }
//           driver {
//             data {
//               id
//               attributes {
//                 sex
//                 name
//                 rate
//                 wechat {
//                   data {
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//                 driver_license {
//                   data {
//                     attributes {
//                       url
//                     }
//                   }
//                 }
//                 balance
//                 balanceAt
//                 phone
//                 memberUntilAt
//                 confirmed
//                 drivership {
//                   data {
//                     id
//                     attributes {
//                       name
//                       privilege
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
// export const getUserByUsername = gql`
//   query getUserByUsername($username: String!) {
//     userByUsername(username: $username) {
//       data {
//         id
//         # attributes {
//         #   email
//         # }
//       }
//     }
//   }
// `
// export const getUserByUserSlug = gql`
//   query checkPID($slug: StringFilterInput!) {
//     usersPermissionsUsers(filters: { slug: $slug }) {
//       data {
//         id
//         attributes {
//           username
//         }
//       }
//     }
//   } # W
// `

// export const queryClientList = gql`
//   query getClient {
//     clients {
//       data {
//         id
//         attributes {
//           name
//           admin {
//             data {
//               id
//               attributes {
//                 username
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
