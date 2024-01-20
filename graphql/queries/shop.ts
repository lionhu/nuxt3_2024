export const queryProduct = `
  query getProduct($uid: ID!) {
    product(id: $uid) {
      data {
        id
        attributes {
          name
          description
          info
          variations {
            data {
              id
              attributes {
                description
                name
                price
                r_price
                buy_price
                inventory
              }
            }
          }
        }
      }
    }
  }
`
export const queryCategoryProducts = `
query getCategoryProducts($uid: ID!) {
  products(filters: { category: { id: { eq: $uid } } }) {
    data {
      id
      attributes {
        name
        description
        imagesList
        variations {
          data {
            id
            attributes {
              name
              price
              inventory
            }
          }
        }
      }
    }
  }
}
`
export const queryCategories = `
  query getCategories {
    categories {
      data {
        id
        attributes {
          name
          products {
            data {
              id
            }
          }
        }
      }
    }
  }
`
export const queryUserOrders = `
  query getUserOrders(
    $fromDateTime: String!
    $endDatetime: String!
    $byStatus: String!
    $userId: String!
  ) {
    userOrders(
      fromDateTime: $fromDateTime
      endDatetime: $endDatetime
      byStatus: $byStatus
      userId: $userId
    ) {
      data {
        id
        attributes {
          Qty
          Total
          Total_buy
          status
          createdAt
          paid
          paid_at
          paid_supplier
          paid_supplier_at
          delivered
          delivered_at
          delivery_info
          payment_info
          payment_supplier_info
          users_permissions_user {
            data {
              id
              attributes {
                username
              }
            }
          }
          address_json
          addressbook {
            data {
              attributes {
                receiver
                email
                phone
              }
            }
          }
          orderitems {
            data {
              id
              attributes {
                qty
                total
                total_buy
                detail_json
                variation {
                  data {
                    attributes {
                      images {
                        data {
                          attributes {
                            url
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
      }
    }
  }
`
export const queryUserOrderDetail = `
  query getOrderDetail($uid: ID!) {
    order(id: $uid) {
      data {
        id
        attributes {
          Qty
          Total
          Total_buy
          status
          paid
          paid_at
          paid_supplier
          paid_supplier_at
          payment_info
          payment_supplier_info
          createdAt
          delivered
          delivered_at
          delivery_info
          users_permissions_user {
            data {
              attributes {
                username
                email
              }
            }
          }
          address_json
          addressbook {
            data {
              id
              attributes {
                receiver
                email
                phone
                postcode
                address_last
                address_first
              }
            }
          }
          orderitems {
            data {
              id
              attributes {
                qty
                total
                total_buy
                detail_json
                variation {
                  data {
                    id
                    attributes {
                      name
                      price
                      r_price
                      buy_price
                      images {
                        data {
                          id
                          attributes {
                            url
                          }
                        }
                      }
                    }
                  }
                }
                product {
                  data {
                    id
                    attributes {
                      name
                      category {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                      images {
                        data {
                          id
                          attributes {
                            url
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
      }
    }
  }
`
export const mutationDeleteOrder = `
  mutation deleteOrder($orderId: ID!) {
    deleteOrder(id: $orderId) {
      data {
        id
      }
    }
  }
`
export const queryUserSettings = `
  query getSetting($rolename: StringFilterInput!, $key: StringFilterInput!) {
    settings(filters: { role: $rolename, key: $key }) {
      data {
        attributes {
          key
          setting
        }
      }
    }
  }
`
