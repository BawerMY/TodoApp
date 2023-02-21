import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Task from './components/Task';

export default function App() {
  const data = require('./data.json')
  const [page, setPage] = useState(<Intro />)
  return (
    <div className="text-[#ffffffd0] bg-[#121212] w-screen max-w-[460px] h-screen">
      {page}
    </div>
  );







  function Intro() {
    const [step, setStep] = useState(0)
    if(step === 1) var data = {img:1, title:'Manage your tasks', description:'You can easily manage all of your daily tasks in DoMe for free', btn:'NEXT'}
    else if(step === 2) var data = {img:2, title:'Create daily routine', description:'In Uptodo  you can create your personalized routine to stay productive', btn:'NEXT'}
    else if(step === 3) var data = {img:3, title:'Orgonaize your tasks', description:'You can organize your daily tasks by adding your tasks into separate categories', btn:'GET STARTED'}   
    return (
      <div>
        {step === 0?
        <div onClick={() => setStep(1)} className='flex h-screen justify-center items-center flex-col'>
          <img src='images/logo.svg' alt='Logo' />
          <h1 className='text-white font-bold text-[40px]'>UpTodo</h1>
        </div>
        :
        ([1,2,3].includes(step)?
        <div className='flex flex-col mx-6 items-center'>
          <div className='mt-[14px] text-left w-full'>
            <a onClick={() => setStep(4)} className='text-base'>SKIP</a>
          </div>
          <img className='mt-8 h-[260px]' src={'images/intro/intro'+data.img+'.svg'} alt="img" />
          <div className='my-[50px] flex gap-2'>
            <div className={'w-[26px] h-1 rounded-full ' + (step===1?"bg-white":'bg-[#AFAFAF]')}></div>
            <div className={'w-[26px] h-1 rounded-full ' + (step===2?"bg-white":'bg-[#AFAFAF]')}></div>
            <div className={'w-[26px] h-1 rounded-full ' + (step===3?"bg-white":'bg-[#AFAFAF]')}></div>
          </div>
          <h1 className='text-[2rem] font-bold mb-[42px]'>{data.title}</h1>
          <p className='text-base text-center mx-[38px]'>{data.description}</p>
          <div className='fixed bottom-0 flex justify-between items-center w-screen max-w-[460px] px-6 mb-[50px]'>
            <a onClick={() => setStep(step-1)} className='text-base'>BACK</a>
            <Button onClick={() => setStep(step+1)} text={data.btn} />
          </div>
        </div>
        : setPage(<App />))}
      </div>
    )
  }








  function App() {
    data.introDone = true
    var task = {
      title:false,
      description:false,
      category: false,
      priority: false,
      time: false,
      completed: false,
      id:data.tasks.length
  }
    const [page, setPage] = useState(<Index />)
    return (
      <>
        {page}
      <div className='z-0 fixed bottom-0 w-screen max-w-[460px] h-[100px] bg-[#363636] justify-between flex pt-3 px-[20px]'>
        <div onClick={() => setPage(<Index />)} className='flex flex-col items-center gap-2'>
            <img src="images/app/0.svg" alt="index" className='w-6' />
            <span className='text-[12px]'>Index</span>
          </div>
        <div onClick={() => setPage(1)} className='flex flex-col items-center gap-2'>
            <img src="images/app/1.svg" alt="calendar" className='w-6' />
            <span className='text-[12px]'>Calendar</span>
          </div>
        <div onClick={() => setPage(<Add />)} className='bg-[#8687E7] -translate-y-[44px] rounded-full w-16 h-16 flex justify-center items-center'>
          <img src='images/app/add.svg' alt='+' />
        </div>
        <div onClick={() => setPage(3)} className='flex flex-col items-center gap-2'>
            <img src="images/app/3.svg" alt="focuse" className='w-6' />
            <span className='text-[12px]'>Focuse</span>
          </div>
        <div onClick={() => setPage(4)} className='flex flex-col items-center gap-2'>
            <img src="images/app/4.svg" alt="user" className='w-6' />
            <span className='text-[12px]'>User</span>
          </div>
      </div>
      </>
    )


    function Index() {
      return (
        <div className='pt-[22px]'>
          <div className='px-[33px] flex justify-between items-center h-[42px] mb-4'>
            <img className='w-6' src="images/app/sort.svg" alt="sort" />
            <h1 className='text-[20px]'>Index</h1>
            <div className='w-6'></div>
          </div>
          {data.tasks.length !== 0?
          <div>
            <label className='flex mx-6 gap-3 p-3 h-12 rounded-[4px] border-[#979797] border-[0.8px]' htmlFor="searchTask">
              <img className='w-6' src="images/app/search-normal.svg" alt="search" />
              <input className='bg-transparent outline-none' placeholder='Search for your task...' type="text" name="searchTask" id="searchTask" />
            </label>
            <div className='mt-[20px] mb-4'></div>
            <div className='mx-6 flex flex-col gap-4 mb-[100px]'>
              {data.tasks.map((task) => {return(<Task onClick={() => {setPage(<TaskPage id={task.id} />)}} key={task.id} task={task} />)})}
            </div>
          </div>
          :
          <div className='flex flex-col gap-[10px] items-center'>
            <img src="images/app/empty.svg" alt="no tasks there" />
            <h1 className='text-[20px]'>What do you want to do today?</h1>
            <h2 className='text-base'>Tap + to add your tasks</h2>
          </div>
          }
        </div>
      )
    }




    function TaskPage(props) {
      task = data.tasks[props.id]
      const [section, setSection] = useState(null)
      return(
        <>
        <div className='z-20 pt-[11px] px-6 flex flex-col gap-7 w-screen bg-[#121212] max-w-[460px] h-screen top-0 fixed max-[460px]:left-0'>
          <div onClick={() => setPage(<Index />)} className='p-1 rounded-[4px]'>
            <img className='w-6 h-6' src="images/task/close.svg" alt="x" />
          </div>
          <div className='flex gap-[21px] mb-2.5 w-full'>
            <div className="w-4 h-4 mt-[9px] border-[#ffffffd0] border-[1.5px] rounded-full bg-[#363636]"></div>
            <div className='flex-auto'>
                <h3 className='text-[20px]'>{task.title}</h3>
                <h4 className='text-[#AFAFAF]'>{task.description}</h4>
            </div>
            <div onClick={() => setSection(<EditNameDesc setSection={setSection} />)} className='w-12 h-12 flex justify-center items-center'>
              <img className='w-6 h-6' src="images/task/edit.svg" alt="edit" />
            </div>
          </div>
          <div onClick={() => setSection(<Date setSection={setSection} />)}  className='flex gap-2 items-center'>
            <img className='w-6 h-6' src="images/task/time.svg" alt="Ti" />
            <span className='flex-auto'>Task Time:</span>
            <div className='px-4 py-2 leading-[21px] bg-[#ffffff4f] rounded-[4px]'>{task.time?task.time:'No set time'}</div>
          </div>
          <div onClick={() => setSection(<Tag setSection={setSection} />)}  className='flex gap-2 items-center'>
            <img className='w-6 h-6' src="images/task/tag.svg" alt="Tg" />
            <span className='flex-auto'>Task Category:</span>
            <div className='px-4 py-2 leading-[21px] bg-[#ffffff4f] rounded-[4px]'>{task.category?<><img src={'images/categories/'+task.category.id+'.svg'} alt=''/>{data.categories[task.category].name}</>:'No set category'}</div>
          </div>
          <div  onClick={() => setSection(<Flag setSection={setSection} />)}  className='flex gap-2 items-center'>
            <img className='w-6 h-6' src="images/task/flag.svg" alt="Pr" />
            <span className='flex-auto'>Task Priority:</span>
            <div className='px-4 py-2 leading-[21px] bg-[#ffffff4f] rounded-[4px]'>{task.priority?<div className='flex gap-2'><img className='w-6 h-6' src="images/task/flag.svg" alt="Pr" /><span>{task.priority}</span></div>:'Default'}</div>
          </div>
          <div onClick={() => setSection(<DeleteTask setSection={setSection} />)} className='flex gap-2 w-[113px] items-center text-[#FF4949]'>
            <img className='w-6 h-6' src="images/task/trash.svg" alt="Dl" />
            <span className='flex-auto '>Delete task</span>
          </div>
        </div>
        {section}
        </>
      )
    }



    function EditNameDesc({setSection}) {
      var newTask = {title:task.title, description:task.description}
      useEffect(() => {
        document.getElementById('title').value = task.title
        if(task.description!==false) document.getElementById('description').value = task.description
      }, [])
      
      return (
        <div className='z-30 fixed top-0 max-sm:left-0 h-screen flex items-center justify-center w-screen max-w-[460px] bg-[#0000004a]'>
            <div className='bg-[#363636] rounded-[4px] px-2 pt-2.5 w-full mx-6 max-w-[460px]'>
              <h2 className='leading-[20px] text-center text-white font-bold text-base'>Edit Task Title</h2>
              <div className='w-[calc(100%-1rem)] h-px mt-[10px] mb-[16px] bg-[#979797]'></div>
              <input autoComplete='off' required={true} onChange={function (e){newTask.title=e.target.value}} className='bg-transparent mx-1.5 mb-[9px] outline-none rounded-[4px] focus:px-4 py-2 focus:border-[1px] border-[#979797] h-[43px] w-full' type='text' id='title' placeholder='Title' />
              <input autoComplete='off' onChange={function (e){newTask.description=e.target.value}} className='bg-transparent outline-none mx-1.5 mb-7 rounded-[4px] focus:px-4 py-2 focus:border-[1px] border-[#979797] h-[43px] w-full' type='text' id='description' placeholder='Description' />
              <div className='flex gap-[15px] pb-1'>
                <button onClick={() => setSection(null)} className='text-base py-3 flex-auto bg-transparent rounded-[4px] text-[#8687E7]'>Cancel</button>
                <button onClick={() => {task.title = newTask.title; task.description=newTask.description; setSection(null)}} className='text-base py-3 flex-auto bg-[#8687E7] rounded-[4px] text-white'>Save</button>
              </div>
            </div>
          </div>
      )
    }

    function DeleteTask({setSection}) {
      return (
        <div className='z-30 fixed top-0 max-sm:left-0 h-screen flex items-center justify-center w-screen max-w-[460px] bg-[#0000004a]'>
          <div className='bg-[#363636] rounded-[4px] px-2 pt-2.5 w-full mx-6 max-w-[460px]'>
            <h2 className='leading-[20px] text-center text-white font-bold text-base'>Delete Task</h2>
            <div className='w-[calc(100%-1rem)] h-px mt-[10px] mb-[16px] bg-[#979797]'></div>
            <div className='text-center text-[18px] leading-[30.5px] mt-6 mb-5'>
              <div>Are You sure you want to delete this task?</div>
              <div>Task title : Do math homework</div>
            </div>
            <div className='flex gap-[15px] pb-1'>
              <button onClick={() => setSection(null)} className='text-base py-3 flex-auto bg-transparent rounded-[4px] text-[#8687E7]'>Cancel</button>
              <button onClick={() => {delete data.tasks[task.id]; setPage(<Index />)}} className='text-base py-3 flex-auto bg-[#8687E7] rounded-[4px] text-white'>Delete</button>
            </div>
          </div>
      </div>
      )
    }

    function Add() {
      const [section, setSection] = useState(null)

      return (
        <>
        {/* will chnge: will be the last page whit prop maybe */}
        <Index />
          <div className='z-10 fixed top-0 max-sm:left-0 h-screen w-screen max-w-[460px] bg-[#0000004a]'>
            <div onClick={() => setPage(<Index />)} className='z-10 fixed top-0 max-sm:left-0 h-[calc(100vh-245px)] w-screen max-w-[460px] bg-[#0000004a]'></div>
            <form action="#!" onSubmit={() => {data.tasks.push(task); setPage(<Index />)}} className='bg-[#363636] fixed bottom-0 rounded-t-2xl p-[25px] w-screen max-w-[460px] pb-[17px]'>
              <h2 className='text-[20px] font-bold'>Add Task</h2>
              <input autoComplete='off' required={true} onChange={function (e){task.title=e.target.value}} className='bg-transparent my-[14px] outline-none rounded-[4px] focus:px-4 py-2 focus:border-[1px] border-[#979797] h-[43px] w-full' type='text' id='title' placeholder='Title' />
              <input autoComplete='off' onChange={function (e){task.description=e.target.value}} className='bg-transparent outline-none mb-[35px] rounded-[4px] focus:px-4 py-2 focus:border-[1px] border-[#979797] h-[43px] w-full' type='text' id='description' placeholder='Description' />
              <div className='flex gap-8'>
                <img onClick={() => setSection(<Date setSection={setSection} />)} alt='time' src='images/task/timer.svg' />
                <img onClick={() => setSection(<Tag setSection={setSection} />)} alt='tag' src='images/task/tag.svg' />
                <img onClick={() => setSection(<Flag setSection={setSection} />)} alt='flag' src='images/task/flag.svg' />
                <div className='flex-auto flex justify-end'>
                  <button type='submit'>
                    <img alt="send" src="images/task/send.svg" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          {section}
        </>
      )
    }

    function Flag({setSection}){
      const [newFlag, setNewFlag] = useState(task.priority)
      return (
        <div className='z-20 mt-[10px] fixed top-0 max-sm:left-0 h-screen w-screen max-w-[460px] bg-[#0000004a] flex justify-center items-center'>
          <div className='mx-6 bg-[#363636] rounded-[4px] pt-[10px] w-full flex flex-col items-center'>
            <h2 className='leading-[20px] text-white font-bold text-base'>Task Priority</h2>
            <div className='w-[calc(100%-1rem)] h-px mt-[10px] mb-[22px] bg-[#979797]'></div>
            <div className='mb-[18px] mx-[11px] flex flex-wrap justify-start gap-4'>
              {function(){
                var flags = [1,2,3,4,5,6,7,8,9,10]
                  return flags.map((flag) => <div key={flag} onClick={() => setNewFlag(flag)} className={'w-[114px] h-[114px] max-sm:w-[calc((100vw-118px)/4)] max-sm:h-[calc((100vw-118px)/4)] justify-center gap-[5px] rounded-[4px] flex flex-col items-center ' + (newFlag===flag?' bg-[#8687E7]':' bg-[#272727]')}>
                  <img alt='flag' src='images/task/flag.svg' />
                  <span className='leading-[21px] text-base'>{flag}</span>
                </div>)
              }()}
            </div>
            <div className='flex gap-[15px] pb-2'>
              <button onClick={() => setSection(null)} className='text-base py-3 w-[190.5px] max-sm:w-[calc((100vw-79px)/2)] bg-transparent rounded-[4px] text-[#8687E7]'>Cancel</button>
              <button onClick={() => {task.priority = newFlag; setSection(null)}} className='text-base py-3 w-[190.5px] max-sm:w-[calc((100vw-79px)/2)] bg-[#8687E7] rounded-[4px] text-white'>Save</button>
            </div>
          </div>
        </div>
      )
      
    }
    







    function Tag({setSection}) {
      const [newTag, setNewTag] = useState(task.category)
      return (
        <div className='z-20 mt-[10px] fixed top-0 max-sm:left-0 h-screen w-screen max-w-[460px] bg-[#0000004a] flex justify-center items-center'>
          <div className='flex-auto'></div>
          <div className='mx-6 bg-[#363636] rounded-[4px] pt-[10px] w-full flex flex-col items-center'>
            <h2 className='leading-[20px] text-white font-bold text-base'>Choose Category</h2>
            <div className='w-[calc(100%-1rem)] h-px mt-[10px] mb-[15px] bg-[#979797]'></div>
            <div className='mb-[18px] mx-[18px] flex flex-wrap justify-start gap-x-[49px] gap-y-4'>
              {function(){
                  return data.categories.map((category) => <div key={category.id} onClick={() => setNewTag(category.id)} className='flex flex-col gap-[5px] items-center justify-center' >
                  <div className={'w-[92px] h-[92px] max-sm:w-[calc((100vw-184px)/3)] max-sm:h-[calc((100vw-184px)/3)] justify-center gap-[5px] rounded-[4px] flex flex-col items-center bg-[#'+category.secondary+'] ' + (newTag===category.id && ' outline outline-offset-0 outline-[#'+category.secondary+'80]')}>
                    <img className='w-[46px] h-[46px] max-sm:w-[calc((100vw-184px)/6)] max-sm:h-[calc((100vw-184px)/6)]' src={'images/categories/'+category.id+".svg"} alt={category.name[0]} />
                  </div>
                  <span className='text-[14px] font-medium'>{data.categories[category.id].name}</span>
                </div>)
              }()}
              <div onClick={() => setSection(<CreateCategory setSection={setSection} />)} className='flex flex-col gap-[5px] items-center justify-center' >
                  <div className='w-[92px] h-[92px] max-sm:w-[calc((100vw-184px)/3)] max-sm:h-[calc((100vw-184px)/3)] justify-center gap-[5px] rounded-[4px] flex flex-col items-center bg-[#80FFD1]' >
                    <img className='w-[46px] h-[46px] max-sm:w-[calc((100vw-184px)/6)] max-sm:h-[calc((100vw-184px)/6)]' src="images/categories/add.svg" alt='+' />
                  </div>
                  <span className='text-[14px] font-medium'>Create New</span>
                </div>
            </div>
            <div className='flex gap-[15px] pb-2'>
              <button onClick={() => setSection(null)} className='text-base py-3 w-[190.5px] max-sm:w-[calc((100vw-79px)/2)] bg-transparent rounded-[4px] text-[#8687E7]'>Cancel</button>
              <button onClick={() => {task.category = newTag; setSection(null)}} className='text-base py-3 w-[190.5px] max-sm:w-[calc((100vw-79px)/2)] bg-[#8687E7] rounded-[4px] text-white'>Save</button>
            </div>
          </div>
        </div>
      )
    }





    function CreateCategory({setSection}) {
      var category = {
        name:false,
        secondary:'000000',
        primary:false,
        id:data.categories.length
      }
      return (
        <div className='z-30 fixed w-screen max-w-[460px] top-0 max-sm:left-0 h-screen bg-[#121212] pt-[26px] px-6'>
          <h2 className='text-[20px] font-bold'>Create new Category</h2>
          <div className='mb-4 mt-5'>
            <label htmlFor='categoryName' className='text-base'>Category Name:</label>
          </div>
          <input required={true} onChange={function (e){category.name=e.target.value}} placeholder='Category Name' className='bg-[#1D1D1D] rounded-[4px] border-[0.8px] border-[#979797] p-3 w-full' type="text" name="categoryName" id="categoryName" />
          <div className='mb-4 mt-5'>
            <label htmlFor='categoryName' className='text-base'>Category Icon:</label>
          </div>
          <label className='bg-[#ffffff4f] rounded-[4px] h-[37px] w-[154px] px-4 py-2'>
            Choose file
            <input className='w-0' type="file" name="categoryIcon" id="categoryIcon" />
          </label>
          <div className='mt-8'>
            <label className='flex' htmlFor='categoryColor'>
              <span className='text-base pr-2 -translate-y-1.5'>Category Color:</span>
              <input className='w-4 h-4' required={true} onChange={function (e){category.secondary=e.target.value.slice(1)}} type="color" name="categoryColor" id="categoryColor" />
            </label>
          </div>
          <div className='fixed flex gap-5 bottom-[47px]'>
            <button onClick={() => setSection(<Tag setSection={setSection} />)} className='text-base py-3 w-[196px] max-sm:w-[calc((100vw-68px)/2)] bg-transparent rounded-[4px] text-[#8687E7]'>Cancel</button>
            <button onClick={() => {data.categories.push(category); setSection(<Tag setSection={setSection} />)}} className='text-base py-3 w-[196px] max-sm:w-[calc((100vw-68px)/2)] bg-[#8687E7] rounded-[4px] text-white'>Save</button>
          </div>
        </div>
      )
    }




    function Date({setSection}) {
      const [date, setDate] = useState(false)
      return (
        <div className='z-20 mt-[10px] fixed top-0 max-sm:left-0 h-screen w-screen max-w-[460px] bg-[#0000004a] flex justify-center items-center'>
          <div className='mx-6 bg-[#363636] rounded-[4px] pt-[10px] w-full flex flex-col items-center'>
            <div className='flex gap-[15px] pb-2'>
              <button onClick={() => setSection(null)} className='text-base py-3 w-[190.5px] max-sm:w-[calc((100vw-79px)/2)] bg-transparent rounded-[4px] text-[#8687E7]'>Cancel</button>
              <button onClick={() => {setSection(null)}} className='text-base py-3 w-[190.5px] max-sm:w-[calc((100vw-79px)/2)] bg-[#8687E7] rounded-[4px] text-white'>Save</button>
            </div>
          </div>
        </div>
      )
    }




  }



}