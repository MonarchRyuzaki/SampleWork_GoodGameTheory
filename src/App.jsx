import { Card, Col, Image, Input, Rate, Row, Pagination } from "antd";
import { useEffect, useState } from "react";
import './styles.css'
import CardSkeleton from "./components/CardSkeleton";
import ErrorComponent from "./components/ErrorComponnt";
const placeholderImage = 'https://www.totalwine.com/media/sys_master/twmmedia/he8/h67/11931543830558.png'

const { Search } = Input;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.sampleapis.com/beers/ale");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : item
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const onSearch = (value) => setSearchTerm(value);
  const handlePageChange = (page) => setCurrentPage(page);

  if (error) return <ErrorComponent errorMessage={error.message} />;

  return (
    <div style={{ padding: "20px" }}>
      <Search
        placeholder="Search Items"
        onSearch={onSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      {loading? <CardSkeleton itemsPerPage={itemsPerPage} /> : null}
      <Row gutter={[16, 16]}>
        {paginatedData.map(({ price, name, rating, image, id }) => (
          <Col key={id} span={6}>
            <Card hoverable className="custom-card" cover={<Image width={80} src={image} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}/>}>
              <h3 className="custom-title">{name}</h3>
              <Rate disabled allowHalf defaultValue={rating.average} className="custom-rate"/>
              <p className="custom-price">{price}</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla odio, quo, laudantium quia architecto quae neque quasi inventore optio, fugit est sit earum iure tenetur qui minima perferendis dolorem nisi!</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={filteredData.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default App;
