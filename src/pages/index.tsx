import Head from "next/head";
import Image from "next/image";
import { ImLocation } from "react-icons/im";
import { FaSearch, FaWater } from "react-icons/fa";
import { TbWind } from "react-icons/tb";
import { useState } from "react";
import { json } from "stream/consumers";

export default function Home() {
  const [city, setCity] = useState<string>();
  const [notFound, setNotFound] = useState<any>(false);
  const [show, setShow] = useState<any>(false);
  const [temperature, setTemperature] = useState<any>("");
  const [description, setDescription] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [wind, setWind] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const getWeather = () => {
    const APIkey = "cbfd245ff355b91c3a7dc61b14fb19ce";
    if (city === "") {
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setShow(false);
          setNotFound(true);
        }
        switch (json.weather[0].main) {
          case "Clear":
            setImage("/sun.png");
            break;
          case "Clouds":
            setImage("/cloudy.png");
            break;
          case "Rain":
            setImage("/rainy-day.png");
            break;
          case "Snow":
            setImage("/snow.png");
            break;

          default:
            setImage("");
        }
        setNotFound(false);

        setShow(true);
        setTemperature(parseInt(json.main.temp));
        setDescription(json.weather[0].description);
        setHumidity(json.main.humidity);
        setWind(json.wind.speed);
      });
  };
  return (
    <>
      <div className="bg-[#06283D] h-screen flex items-center justify-center">
        {" "}
        <div className="flex flex-col justify-between items-center gap-10 bg-white text-[#06283D] py-8 px-14 rounded-lg">
          <div className="flex">
            <div className="flex items-center gap-3">
              {" "}
              <ImLocation />
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
                placeholder="Search Location"
                className="outline-none w-max"
              ></input>
            </div>
            <button
              onClick={getWeather}
              className=" bg-teal-200 p-2 rounded-full"
            >
              <FaSearch />
            </button>
          </div>
          <div className="flex flex-col">
            {show && (
              <div>
                <img
                  src={image}
                  alt="Location Not Found"
                  className="w-64 h-64"
                />
                <div className=" text-center">
                  <div>
                    {temperature - 273}
                    <span>℃</span>
                  </div>
                  <div>{description}</div>
                </div>
              </div>
            )}
            {notFound && (
              <div>
                <img
                  src="/not-found.svg"
                  alt="Location Not Found"
                  className="w-64 h-64"
                />
              </div>
            )}

            <div className="flex justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <FaWater /> Humidity
              </div>
              <div className="flex items-center gap-2">
                <TbWind /> Wind Speed
              </div>
            </div>
            <div className="flex justify-between items-center gap-8 mt-6">
              <div className="flex items-center gap-2">{humidity}%</div>
              <div className="flex items-center gap-2">{wind} Km/h</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
