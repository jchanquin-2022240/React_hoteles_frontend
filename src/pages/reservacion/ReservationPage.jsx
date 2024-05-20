import { useParams } from "react-router-dom"

export const ReservacionPage = () => {
    const { id } = useParams();
  return (
    <div>
      {id}
    </div>
  )
}


