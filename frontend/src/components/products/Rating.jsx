import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Rating = ({ rating }) => {
//   if (rating === undefined) {
//     rating = 1;
//   }
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<AiFillStar key={i} color="rgba(246, 186, 0)" size={25} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<BsStarHalf key={i} color="rgba(246, 186, 0)" size={25} />);
    } else {
      stars.push(<AiOutlineStar key={i} color="rgba(246, 186, 0)" size={25} />);
    }
  }
  return <div className="flex cursor-pointer">{stars}</div>;
};

export default Rating;
