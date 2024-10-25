import { RiDashboard3Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LiaUserTieSolid } from "react-icons/lia";
import { TbDog } from "react-icons/tb";
import { TbFileAnalytics } from "react-icons/tb";

const navConfig = [
    {
      title: 'Panel',
      path: '/dashboard',
      icon: <RiDashboard3Line size={20}/>,
    },
    {
      title: 'Usuarios',
      path: '/dashboard/users',
      icon: <HiOutlineUserGroup size={20}/>,
    },
    {
      title: 'Clientes',
      path: '/dashboard/customers',
      icon: <LiaUserTieSolid size={20}/>
      ,
    },
    {
      title: 'Mascotas',
      path: '/dashboard/pets',
      icon: <TbDog size={20}/>,
    },
    {
      title: 'Reportes',
      path: '/dashboard/reports',
      icon:<TbFileAnalytics size={20}/>,
    },
    
  ];
  
  export default navConfig;