
import { BsBuildingsFill } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { MdPeople } from "react-icons/md";
import { SiGooglescholar } from "react-icons/si";
import CardWidget from "../card/CardWidget";

/**
 * Renders the Dashboard component.
 *
 * @return {JSX.Element} The rendered Dashboard component.
 */
export default function Dashboard() {

  return (
    <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      <CardWidget
        icon={<MdPeople className="h-6 w-6" />}
        title={"Total Staffs"}
        subtitle={"100"}
      />
      <CardWidget
        icon={<SiGooglescholar className="h-6 w-6"/>}
        title={"Total Students"}
        subtitle={"1000"}
      />
      <CardWidget
        icon={<IoBookSharp className="h-6 w-6" />}
        title={"Total Courses"}
        subtitle={"500"}
      />
      <CardWidget
        icon={<BsBuildingsFill className="h-6 w-6" />}
        title={"Faculty"}
        subtitle={"15"}
        divide={true}
        title2={"Department"}
        subtitle2={"30"}
      />
    </div>
  );
}
