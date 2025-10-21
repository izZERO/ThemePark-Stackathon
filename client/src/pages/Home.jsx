import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { GetItems } from "../services/item"
import { Button, Card, Badge } from "react-bootstrap"

const Home = () => {
  let navigate = useNavigate()

  const [items, setItems] = useState([])

  useEffect(() => {
    const handleItems = async () => {
      const data = await GetItems()
      setItems(data)
    }

    handleItems()
  }, [])

  return (
    <>
      <Button
        variant="success"
        onClick={() => navigate("/additem")}
        className="btn-add-item"
      >
        Lost an item? Report it Missing here!
      </Button>
      <h1>Lost Item List</h1>
      {items.map((item) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={item.img} />
          <Card.ImgOverlay>
            <Card.Title>{item.name}</Card.Title>
            <Badge bg="warning" text="dark">
              {item.status}
            </Badge>
          </Card.ImgOverlay>
          <Card.Body>
            <Card.Text text="dark">{item.description}</Card.Text>
            <Card.Text text="info">{item.lastseen}</Card.Text>
            <Button variant="primary" onClick={() => navigate("/")}>
              Found
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default Home
