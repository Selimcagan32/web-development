import { useNavigate } from "react-router-dom";
import type { EventFormData } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/forms/EventForm";

const emptyForm: EventFormData = {
  title: "",
  category: "",
  capacity: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="bolum-baslik">Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </>
  );
}

export default AddEventPage;
