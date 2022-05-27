import { async } from '@firebase/util';
import { signOut } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, Nav, Navbar } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';
import './Calender.css';
const Calenderr = ({ handleValue }) => {
  const [value, onChange] = useState(new Date());
  const [cal, setCal] = useState({});
  const [idd, setIdd] = useState('');
  const [result, setResult] = useState();
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState([]);
  const [hangouts, setHangouts] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();

  const [user, loading, error] = useAuthState(auth);
  //console.log(event)
  const logout = () => {
    signOut(auth);
  };
  // value.toString().substr(8, 2);
  // console.log(
  //   value.toString().substr(0, 15) === new Date().toString().substr(0, 15),
  // );
  //console.log('result:',result);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    fetch('https://ellskerwebsite.herokuapp.com/api/calender')
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        // console.log('Successs:', data.data.calender);
        setResult(data.data.calender);
      });
  }, [result]);
  useEffect(() => {
    fetch('https://ellskerwebsite.herokuapp.com/api/events')
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        //console.log('Successs:', data);
        setEvent(data);
      });
  }, [result]);
  useEffect(() => {
    fetch('https://ellskerwebsite.herokuapp.com/api/hangouts')
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        //console.log('Successssssss:', data);
        setHangouts(data);
      });
  }, [result]);

  var b = [];
  var k=[];
for(let i=0;i<event?.length;i++){
  // console.log(i,event[i])
  k.push(event[i])
}
  
 
  // console.log("k",k)

  result?.map((w, index) => {
    console.log(w.date);
    const a = k?.filter((r) => r?.date.substr(0, 10) === w?.date);
    // console.log("a is:",a)
    if (a?.length > 0) {
      if (b?.length >= 0) {
        b.push(a);
        k.shift();
      }
    }
  });

  // console.log('b', b);

  //  for(let i=0;i!==1;i++){
  //   b.pop();
  //  }

  var c = [];
var e=[]

  for(let i=0;i<hangouts?.length;i++){
   // console.log(i,hangouts[i])
    e.push(hangouts[i])
  }
  // console.log("e",e)
  // result?.map((w) => {
  //   //console.log(w.date)
  //   const a = e.filter((r) => r?.date.substr(0, 10) === w?.date);
  //   if (a?.length > 0) {
  //     if (c.length === 0) {
  //       c.push(a);
  //     }
  //   }
  // });

  result?.map((w, index) => {
    console.log(w.date);
    const a = e?.filter((r) => r?.date.substr(0, 10) === w?.date);
    // console.log("a is:",a)
    if (a?.length > 0) {
      if (c?.length >= 0) {
        c.push(a);
        e.shift();
      }
    }
  });
  var d;
  console.log("e",c)
  // d = c[0];
  //console.log(d)
  const handleDelte = async (id) => {
    // console.log('Delete');
    fetch(`https://ellskerwebsite.herokuapp.com/api/calender/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => setResult(result));
    toast('Item Deleted');
  };

  useEffect(() => {
    if (
      value.toString().substr(0, 15) === new Date().toString().substr(0, 15)
    ) {
      return;
    }
    fetch('https://ellskerwebsite.herokuapp.com/api/calender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        // console.log('Success:');
        // data.data.calender.date
        // const date1=data.data.calender.date.substr(8,2)
        // const data2=parseInt(date1)+1
        // const newDate=data.data.calender.date.replace(data.data.calender.date.substr(8,2),data2)
        // console.log(data);
        toast('Item Added');
        //setCal(newDate);
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [value]);

  const hanldeAddCalender = () => {};
  //hanldeAddCalender()
  const handleEdit = (id) => {
    setIdd(id);

    handleShow();
  };

  const handleformSubmit = (e) => {
    e.preventDefault();
    console.log(idd);
    const date = e.target.date.value;
    const time = e.target.day.value;
    const newData = { date, time };
    // console.log(newData);
    const url = `https://ellskerwebsite.herokuapp.com/api/calender/${idd}`;
    // console.log(url);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newData }),
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        //console.log('Success:', data);
        setResult(result);
        handleClose();
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  //console.log(value);
  return (
    <div className='lender '>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to='/dashboard'>
            {' '}
            DashBoard
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              {user ? (
                <button type='button' onClick={logout} className='btn btn-dark'>
                  signout
                </button>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <button type='button' className='btn btn-dark'>
                    Login
                  </button>
                </Nav.Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1 className='text-center'>Hi {user?.email || user?.displayName}</h1>
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          className='w-50 bg-transparent container'
        />
      </div>

      <div className='mt-3 container'>
        <Card className='w-75 bg-transparent container'>
          <Card.Body className='m-auto ms-5 w-100'>
            <blockquote className='blockquote mb-0 '>
              {result?.map((x) => (
                <div className='row row-cols-lg-4 g-5 m-auto'>
                  <div>
                    <p>
                      date: {x?.date} and time: {x?.time}{' '}
                    </p>
                  </div>
                  <div className='d-flex align-items-center justify-content-center'>
                    <div>
                      {b.map((t) =>
                        t[0]?.date.substr(0, 10) === x?.date ? (
                          <p>Event: {t[0]?.title}</p>
                        ) : (
                          <p></p>
                        ),
                      )}
                    </div>
                    <div className='ps-5'>
                      {c?.map((t) =>
                        t[0]?.date?.substr(0, 10) === x?.date ? (
                          <p>Hangouts: {t[0]?.title}</p>
                        ) : (
                          <p></p>
                        ),
                      )}
                      {/* {d[0].date.substr(0, 10) === x?.date ? (
                        <p>Hangouts: {c[0][0].title}</p>
                      ) : (
                        <p>No Hangouts</p>
                      )} */}

                      <p></p>
                    </div>
                  </div>

                  <div>
                    <div>
                      <button
                        className='btn btn-danger'
                        onClick={() => handleDelte(x?._id)}>
                        <i class='fas fa-edit'></i> Delete
                      </button>
                      <button
                        className='btn btn-success'
                        variant='primary'
                        onClick={() => handleEdit(x?._id)}>
                        Edit
                      </button>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop='static'
                        keyboard={false}>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                          <form onSubmit={handleformSubmit}>
                            <input
                              className='form-control mb-5'
                              type='text'
                              placeholder='year/month/date'
                              name='date'
                              required
                            />
                            <input
                              className='form-control mb-5'
                              type='text'
                              placeholder='Day'
                              name='day'
                              required
                            />
                            <input
                              type='submit'
                              className='btn btn-dark'
                              placeholder='time'
                              required
                            />
                          </form>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              ))}
            </blockquote>
          </Card.Body>
        </Card>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Calenderr;
