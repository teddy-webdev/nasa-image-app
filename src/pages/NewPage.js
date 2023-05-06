import React from "react";
import { useParams } from "react-router-dom";
import { useEffect , useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
function ItemPage({ images }) {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [asset, setAsset] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const nasa_id = id
  var donee = []
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?nasa_id=${nasa_id}`
        );
        // eslint-disable-next-line
        donee = response.data.collection.items[0].data[0]
        console.log(donee);
        const item_name = donee.title;
        setName(item_name);
        const created_at = donee.date_created;
        setTime(created_at);
        const text = donee.description;
        setDescription(text);
        const media_type = donee.media_type;
        setType(media_type);
        
        const imageData =(response.data.collection.items[0].links[0].href)
        setAsset(imageData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [nasa_id]);

  return (
    <div className="glass flex items-center justify-center h-screen w-screen overflow-x-none">
      <div className="flex flex-col items-start justify-start glass h-screen w-screen p-4 gap-6 overflow-x-auto">
        <Link className=" text-gray-100 underline text-sm font-normal"  to={`/`} >
        <h1>home</h1>
        </Link>

      <div className="flex flex-col items-center justify-center font-semibold gap-6  ">
      <h1 className="mt-6 font-bold text-lg">{name}</h1>
      <img
                  src={asset}
                  alt={asset}
                  className="image"
                />
      <div className="flex flex-col items-start justify-center">
      <h1>Created at: {time}</h1>
      <h1>Media Type: {type}</h1>
      </div>
      <div className="flex flex-col items-start justify-center ">
      <h1>Description: {description}</h1>
      </div>
      </div>
      </div>
    </div>
  );
}

export default ItemPage;
