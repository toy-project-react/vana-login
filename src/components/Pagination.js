import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLimitOffset, changeCurrent, changeStartEnd } from 'modules/noti';

const mapStateToProps = state => {
  return {
    pagination: state.noti.pagination,
    params: state.noti.params
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeLimitOffset: payload => dispatch(changeLimitOffset(payload)),
    changeCurrent: payload => dispatch(changeCurrent(payload)),
    changeStartEnd: payload => dispatch(changeStartEnd(payload))
  };
};

class Pagination extends Component {
  changeLimit = e => {
    const chViewCnt = Number(e.target.value);
    const params = {
      limit: chViewCnt,
      offset: 0
    };
    this.onClickFirstPage('changeLimit'); // limit를 변경하면 맨 첫 페이지로 이동하기 위함.
    this.props.changeLimitOffset(params);
    this.handleChange(params);
  };

  changeOffset = offset => {
    const params = {
      limit: this.props.params.limit,
      offset
    };
    this.props.changeLimitOffset(params);
    this.handleChange(params);
  };

  handleChange = params => {
    this.props.onChange(params);
  };

  onClickPrevPage = () => {
    const {
      pagination: { current, start, end }
    } = this.props;
    if (current > 1) {
      if (current % 5 === 1) {
        const s = start - 5;
        const e = end - 5;
        this.updateStartEndPage(s, e);
      }
      this.updateCurrPage(current - 1);
    }
  };

  onClickNextPage = () => {
    const {
      pagination: { current, start, end }
    } = this.props;
    const max = this.max;
    if (current < max) {
      if (current !== 1 && (current + 1) % 5 === 1) {
        const s = start + 5;
        const e = end + 5;
        this.updateStartEndPage(s, e);
      }
      this.updateCurrPage(current + 1);
    }
  };

  onClickFirstPage = action => {
    const {
      pagination: { current }
    } = this.props;

    if (current > 1) {
      this.updateStartEndPage(0, 5);
      this.updateCurrPage(1, action);
    }
  };

  onClickLastPage = () => {
    const {
      count,
      pagination: { start, end, current },
      params: { limit }
    } = this.props;
    const max = Math.ceil(count / limit);

    if (current < max) {
      let startNum = start;
      let endNum = end;
      startNum = max > 5 ? max - 5 : start;
      endNum = max;
      this.updateStartEndPage(startNum, endNum);
      this.updateCurrPage(max);
    }
  };

  updateStartEndPage = (start, end) => {
    this.props.changeStartEnd({
      start,
      end
    });
  };

  updateCurrPage = (current, action) => {
    const {
      changeCurrent,
      params: { limit }
    } = this.props;

    changeCurrent({ current });
    const offset = (current - 1) * limit;
    action !== 'changeLimit' && this.changeOffset(offset);
  };

  componentDidMount() {
    const {
      count,
      params: { limit }
    } = this.props;
    this.max = Math.ceil(count / limit);
  }

  render() {
    const {
      count,
      params: { limit, offset },
      pagination: { start, end, current }
    } = this.props;
    const limitList = [25, 50, 100];
    const pageSize = Math.ceil(count / limit);
    const array = [];
    for (let i = 0; i < pageSize; i++) {
      array.push(i + 1);
    }
    const target = array.slice(start, end);
    return (
      <div className="page-nav">
        <button className="first" onClick={this.onClickFirstPage} />
        <button className="prev" onClick={this.onClickPrevPage} />
        {target.map(val => {
          return val === current ? (
            <span key={val}>{val}</span>
          ) : (
            <button
              key={val}
              onClick={() => {
                this.updateCurrPage(val);
              }}
            >
              {val}
            </button>
          );
        })}
        <button className="next" onClick={this.onClickNextPage} />
        <button className="last" onClick={this.onClickLastPage} />
        <select onChange={this.changeLimit} value={limit}>
          {limitList.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <p>
          {offset === 0 ? 1 : offset}-{current * limit} of {count}
        </p>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
