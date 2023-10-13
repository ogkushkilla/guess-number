import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    showRestartButton: false,
  };

  // Первый способ привязки функции к компоненту
  // this.handleSubmit = this.handleSubmit.bind(this);
  // Второй - создание функции ниже

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше заданного`,
          userNumber: '',
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше заданного`,
          userNumber: '',
        };
      }
      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        showRestartButton: true,
      };
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      result: `Введите число`,
      userNumber: '',
      count: 0,
      randomNumber:
        Math.floor(Math.random() * this.props.max - this.props.min) +
        this.props.min,
      showRestartButton: false,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form}
          onSubmit={this.handleSubmit}>

          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber} />

          {
            this.state.showRestartButton ?
              <button className={style.btn}
                onClick={this.handleClick}>Сыграть ещё</button> :
              <button className={style.btn}>Угадать</button>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
