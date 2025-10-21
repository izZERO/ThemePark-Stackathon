import Client from "./api"

export const AddNewItem = async (data) => {
  try {
    const res = await Client.post("/add/item", data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetItems = async () => {
  try {
    const res = await Client.get("/items")
    return res.data
  } catch (error) {
    throw error
  }
}
