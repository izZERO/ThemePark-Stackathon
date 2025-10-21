import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddNewItem } from "../services/item.js"
import { Button, Form } from "react-bootstrap"

import "../App.css"

const AddItem = () => {
  let navigate = useNavigate()
  const initialState = {
    name: "",
    description: "",
    lastseen: "",
    ownername: "",
    status: "Lost",
    email: "",
  }
  const initialImage = { image: null }

  const [formValues, setFormValues] = useState(initialState)
  const [selectedImage, setSelectedImage] = useState(initialImage)

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setSelectedImage({ [e.target.name]: e.target.files[0] })
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // await AddNewItem(formValues)
    setFormValues(initialState)
    setSelectedImage(initialImage)
    console.log(formValues)
    console.log(selectedImage)
    navigate("/")
  }

  return (
    <>
      <Button
        variant="success"
        onClick={() => navigate("/")}
        className="btn-home"
      >
        Home
      </Button>

      <div className="form-wrapper">
        <Form onSubmit={handleSubmit} className="custom-form">
          <Form.Group className="filed-form" controlId="name">
            <Form.Label className="filed-label">Name</Form.Label>
            <Form.Control
              className="filed-input"
              name="name"
              type="text"
              placeholder="Enter item name"
              onChange={handleChange}
              value={formValues.name}
              required
              autoComplete="name"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="description">
            <Form.Label className="filed-label">Description</Form.Label>
            <Form.Control
              className="filed-input"
              name="description"
              type="text"
              placeholder="Describe the item in detail (color, brand, size...)"
              onChange={handleChange}
              value={formValues.description}
              required
              autoComplete="description"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="lastseen">
            <Form.Label className="filed-label">Last Seen</Form.Label>
            <Form.Control
              className="filed-input"
              name="lastseen"
              type="text"
              placeholder="Approximate place item was lost"
              onChange={handleChange}
              value={formValues.lastseen}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="ownername">
            <Form.Label className="filed-label">Owner Name</Form.Label>
            <Form.Control
              className="filed-input"
              name="ownername"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              value={formValues.ownername}
              autoComplete="ownername"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="email">
            <Form.Label className="filed-label">Owner Email</Form.Label>
            <Form.Control
              className="filed-input"
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={formValues.email}
              required
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="image">
            <Form.Label className="filed-label"> Upload Image</Form.Label>
            <Form.Control
              className="filed-input"
              name="image"
              type="file"
              onChange={handleChange}
              autoComplete="off"
            />
          </Form.Group>
          <Button
            disabled={!formValues.email || !formValues.name}
            variant="primary"
            type="submit"
          >
            Add
          </Button>
        </Form>
      </div>
    </>
  )
}

export default AddItem
