import Dropdown from '@/components/Dropdown';

export default function Home() {
  return (
    <div className='m-4' >
      {/* <Navbar></> => add later on*/} 
      <div className='text-center text-3xl '>
      Gantt Chart Visulizer
      </div>
      <Dropdown></Dropdown>
    </div>
    
      );
}
