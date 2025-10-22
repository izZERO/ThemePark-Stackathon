import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { GetItems } from "../services/item"
import { Button, Card, Badge, Container, Row, Col } from "react-bootstrap"

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
      <h1 className="title-home">Lost Item List</h1>
      <Container fluid style={{ marginBottom: "16px" }}>
        <Row className="g-4">
          {items.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`/Items/${item.image}`}
                  alt="Lost item image"
                  style={{ height: "165px", objectFit: "cover" }}
                />
                <Card.ImgOverlay>
                  <Card.Title className="item-name">{item.name}</Card.Title>
                  <Badge bg="warning" text="dark">
                    {item.status}
                  </Badge>
                </Card.ImgOverlay>
                <Card.Body>
                  <Card.Text className="text-dark">
                    {item.description}
                  </Card.Text>
                  <Card.Text className="text-secondary">
                    {item.lastSeen}
                  </Card.Text>
                  <Card.Text className="text-danger">{item.owner}</Card.Text>

                  <Button variant="primary" onClick={() => navigate("/")}>
                    Found
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
