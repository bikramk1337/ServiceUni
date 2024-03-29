import axios from "axios"

const baseApiUrl = process.env.REACT_APP_ROOT_URL + "/api/v1";
const userEP = baseApiUrl + "/user"
const bookEp = baseApiUrl + "/book"
const transactionEp = baseApiUrl + "/transaction"



const getUserId = () => {
  const user = JSON.parse(sessionStorage.getItem("user"))
  if (user) {
    return user?._id
  }
  return
}

export const getUser = async () => {
  try {
    const userId = getUserId()
    const { data } = await axios.get(userEP, {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const postNewUser = async (userData) => {
  try {
    console.log(userData, "axios")
    const { data } = await axios.post(userEP, userData)
    console.log(data, "axios")

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const loginUser = async (userData) => {
  try {
    const { data } = await axios.post(userEP + "/login", userData)

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const updatePassword = async (passInfo) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.patch(userEP + "/password-update", passInfo, {
      headers: {
        Authorization: userId,
      },
    })

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const editUserInfo = async (userData) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.patch(userEP + "/edit-user", userData, {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// BOOK

export const addBook = async (bookInfo) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.post(bookEp, bookInfo, {
      headers: { Authorization: userId },
    })

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getBooks = async () => {
  try {
    const userId = getUserId()
    console.log(userId)
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.get(bookEp, {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const borrowBook = async (bookId) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.post(
      bookEp + "/borrow",
      { bookId },
      {
        headers: {
          Authorization: userId,
        },
      }
    )
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const deleteBook = async (bookId) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.delete(bookEp, {
      data: { bookId },
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getBorrowedBooks = async () => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.get(bookEp + "/borrowedBooks", {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const returnBook = async (bookId) => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.patch(
      bookEp + "/return",
      { bookId },
      {
        headers: {
          Authorization: userId,
        },
      }
    )
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// TRANSACTION

export const getAllTransactions = async () => {
  try {
    const userId = getUserId()
    if (!userId) {
      return {
        status: "error",
        message: "Please Log in first!",
      }
    }
    const { data } = await axios.get(transactionEp, {
      headers: {
        Authorization: userId,
      },
    })
    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
