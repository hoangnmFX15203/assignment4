import styles from './AddModalBox.module.scss';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addNewStaff } from '~/action';
import { STAFFS, DEPARTMENTS } from '~/assets/data/staffs';

const cx = className.bind(styles);

function AddModalBox() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    useEffect(() => {
        const modalBox = document.getElementById('modal-box');
        if (show) {
            modalBox.classList.remove('AddModalBox_hide__6I+Dq');
            modalBox.classList.add('AddModalBox_show__s-8yj');
        } else {
            modalBox.classList.remove('AddModalBox_show__s-8yj');
            modalBox.classList.add('AddModalBox_hide__6I+Dq');
        }
    }, [show]);

    
    const dispatch = useDispatch();

    const handleAddStaff = (data) => {
        const id = Math.max(...STAFFS.map((staff) => staff.id)) + 1;
        const deps = DEPARTMENTS.indexOf(
            DEPARTMENTS.find((deps) => deps.id === data.department),
        );
        const staff = {
            id: id,
            name: data.name,
            doB: data.doB,
            salaryScale: data.scaleSalary,
            startDate: data.startDate,
            department: DEPARTMENTS[deps],
            annualLeave: data.annualLeave,
            overTime: data.overTime,
            image: '/assets/images/avarta.png',
        };
        const action = addNewStaff(staff);
        dispatch(action);
        setShow(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data.name);
    };

    function handleScaleSalary(e) {
        if (e.target.value < 1) {
            return (e.target.value = 1);
        } else if (e.target.value > 3) {
            return (e.target.value = 3);
        }
    }

    return (
        <>
            <div className={cx('modal-icon')} onClick={handleShow}>
                <FontAwesomeIcon icon={faSquarePlus} />
            </div>
            <div className={cx('wrapper', 'hide')} id="modal-box">
                <div className={cx('add-container', 'col-md-4')}>
                    <div className={cx('title')}>
                        <span>thêm nhân viên</span>
                        <div className={cx('close-icon')} onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                    <div className={cx('add-content', 'row')}>
                        <form onSubmit={handleSubmit(handleAddStaff)}>
                            <label htmlFor="name">Tên</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                {...register('name', {
                                    required: true,
                                    minLength: 2,
                                    maxLength: 30,
                                })}
                            />
                            <br />
                            {Object.keys(errors).length !== 0 && (
                                <ul className={cx('errors-container')}>
                                    {errors.name?.type === 'required' && (
                                        <li>Bạn chưa nhâp tên</li>
                                    )}
                                    {errors.name?.type === 'minLength' && (
                                        <li>Tên phải lớn hơn 2 ký tự</li>
                                    )}
                                    {errors.name?.type === 'maxLength' && (
                                        <li>Tên phải nhỏ hơn 30 ký tự</li>
                                    )}
                                </ul>
                            )}
                            <label htmlFor="dob">Ngày sinh</label>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                {...register('dob', {
                                    required: true,
                                })}
                            />
                            <br />
                            {Object.keys(errors).length !== 0 && (
                                <ul className={cx('errors-container')}>
                                    {errors.dob?.type === 'required' && (
                                        <li>Bạn chưa nhâp ngày sinh</li>
                                    )}
                                </ul>
                            )}
                            <label htmlFor="startDate">Ngày bắt đầu</label>
                            <input
                                type="date"
                                name="startDate"
                                id="startDate"
                                {...register('startDate', {
                                    required: true,
                                })}
                            />
                            <br />
                            {Object.keys(errors).length !== 0 && (
                                <ul className={cx('errors-container')}>
                                    {errors.startDate?.type === 'required' && (
                                        <li>Bạn chưa nhâp ngày bắt đầu</li>
                                    )}
                                </ul>
                            )}
                            <label htmlFor="department">Phòng ban</label>
                            <select
                                name="department"
                                id="department"
                                {...register('department')}
                            >
                                <option value="Dept01">Sale</option>
                                <option value="Dept02">HR</option>
                                <option value="Dept03">Marketing</option>
                                <option value="Dept04">IT</option>
                                <option value="Dept05">Finance</option>
                            </select>
                            <br />
                            <label htmlFor="scaleSalary">Hệ số lương</label>
                            <input
                                type="number"
                                name="scaleSalary"
                                step="any"
                                id="scaleSalary"
                                placeholder="1.0 -> 3.0"
                                {...register('scaleSalary', {
                                    onChange: (e) => {
                                        handleScaleSalary(e);
                                    },
                                })}
                            />
                            <label htmlFor="annual-leave">
                                Số ngày nghỉ còn lại
                            </label>
                            <input
                                type="text"
                                name="annualLeave"
                                id="annualLeave"
                                {...register('annualLeave')}
                            />
                            <label htmlFor="overTime">Số ngày làm thêm</label>
                            <input
                                type="text"
                                name="overTime"
                                id="overTime"
                                {...register('overTime')}
                            />
                            <div className={cx('add-btn')}>
                                <button className={cx('add')} type="submit">
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddModalBox;
