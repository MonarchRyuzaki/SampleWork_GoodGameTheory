    import { Card, Col, Row, Skeleton } from "antd";
    
    const CardSkeleton = ({ itemsPerPage }) => {
      return (
        <Row gutter={[16, 16]}>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <Col key={index} span={6}>
              <Card hoverable className="custom-card">
                <Skeleton.Image style={{ width: 80, height: 80 }} />
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            </Col>
          ))}
        </Row>
      )
    }
    
    export default CardSkeleton