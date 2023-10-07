import React from "react";
import { Form } from "react-bootstrap";
import classes from "./Chat.module.css";
import { NavLink } from "react-router-dom";

const ChatRooms = () => {
  const rooms = [
    // {
    //   title: "Horoscope",
    //   id: Math.floor(Math.random() * 1000) + "abcd",
    //   imageSource:
    //     "https://img.freepik.com/free-vector/zodiac-circle-with-horoscope-signs-fish-pisces-scorpio-aquarius-zodiak-aries-virgo-vector-illustration_1284-46992.jpg?w=2000",
    // },
    // {
    //   title: "Sport",
    //   id: Math.floor(Math.random() * 1000) + "abcd",
    //   imageSource:
    //     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/800px-Sport_balls.svg.png",
    // },
    // {
    //   title: "Movies",
    //   id: Math.floor(Math.random() * 1000) + "abcd",
    //   imageSource:
    //     "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    // },
    // {
    //   title: "Politics",
    //   id: Math.floor(Math.random() * 1000) + "abcd",
    //   imageSource:
    //     "https://i.cbc.ca/1.4350103.1676073552!/fileImage/httpImage/power-and-politics.jpg",
    // },
    {
      title: "ASK AI",
      id: Math.floor(Math.random() * 1000) + "abcd",
      imageSource:
        "https://play-lh.googleusercontent.com/Zsk_jNGcPjP8seH7LMREHb8pNXQZ-BKkiD_38tiw1mijgfnSnrxnyuHfTsZIG1jaKS4",
    },
    // {
    //   title: "Relationships",
    //   id: Math.floor(Math.random() * 1000) + "abcd",
    //   imageSource:
    //     "https://www.verywellmind.com/thmb/dK8-bHytHvx-yXjNEJr5AEDOxJA=/1080x0/filters:no_upscale():max_bytes(150000):strip_icc()/IlloDot_Relationships-cbcc130cbfad48f085228eb90865a502.png",
    // },
    // {
    //   title: "Tourism",
    //   id: Math.floor(Math.random() * 1000) + "abcd",
    //   imageSource:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQM3czawy8LMf6WJCcmELvUG1RqFd5ZoOujRZYaYV1fDf03tQzfKbR5cZC7lEX7jsXpEM&usqp=CAU",
    // },
  ];

  return (
    <div className="mt-5">
      <Form.Group>
        <Form.Control
          className={classes.room_search}
          placeholder="Search Rooms"
        />
      </Form.Group>

      <div className="mt-4">
        {rooms.map((room) => {
          return (
            <div key={room.id} className="mb-3 d-flex">
              <NavLink
                className={`${classes.room_link}`}
                to={`/chat/${room.title}`}
              >
                <img
                  className={`${classes.room_image}`}
                  src={room.imageSource}
                  alt="room_image"
                />{" "}
              </NavLink>
              <NavLink
                className={`${classes.room_link} d-none d-sm-none d-md-block`}
                to={`/chat/${room.title}`}
              >
                {room.title}
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatRooms;
