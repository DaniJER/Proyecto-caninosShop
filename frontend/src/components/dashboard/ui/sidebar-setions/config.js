import { RiDashboard3Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbDog } from "react-icons/tb";
import { TbFileAnalytics } from "react-icons/tb";
import { BsCart3 } from "react-icons/bs";

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
      title: 'Mascotas',
      path: '/dashboard/pets',
      icon: <TbDog size={20}/>,
    },
    {
      title: 'Pedidos',
      path: '/dashboard/orders',
      icon: <BsCart3 size={20} />
      ,
    },
    {
      title: 'Reportes',
      path: '/dashboard/reports',
      icon:<TbFileAnalytics size={20}/>,
    },
    
  ];
  
  export default navConfig;