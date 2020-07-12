import React, { Component } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subject: '',
      mark: '',
      items: [],
      isUpdate: false,
      totalMark: '',
      persentage: ''
    }


    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleMarkChange = this.handleMarkChange.bind(this)
    // this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  handleSubjectChange(e) {
    this.setState({
      subject: e.target.value,
    });
  }

  handleMarkChange(e) {
    this.setState({
      mark: e.target.value
    });
  }

  handleClickAdd = (e) => {
    e.preventDefault();
    let items = [...this.state.items];
    items.push({
      subject: this.state.subject,
      mark: this.state.mark,
    });
    // let totalmark=parseInt(this.state.totalMark)
    this.setState({
      items,
      subject: '',
      mark: '',
      totalMark: Number(this.state.totalMark) + Number(this.state.mark),
      persentage: (Number(this.state.totalMark) + Number(this.state.mark)) / (items.length)
    });

  }
  handleDeleteRow(i) {
    let items = [...this.state.items]
    let deleteItem = items[i];
    console.log(deleteItem)
    console.log("delete " + i);
    items.splice(i, 1)
    this.setState({
      items: items,
      persentage: (Number(this.state.totalMark) - Number(deleteItem.mark)) / (items.length),
      totalMark: Number(this.state.totalMark) - Number(deleteItem.mark)
    });
  }

  handleEdit(i) {
    console.log("handle edit.  .." + i)
    const { items } = this.state;
    this.setState({
      isUpdate: true, subject: items[i].subject, mark: items[i].mark, activeIndex: i,
      totalMark: Number(this.state.totalMark) - Number(items[i].mark),
      persentage: (Number(this.state.totalMark) - Number(items[i].mark)) / (items.length - 1)
    });
  }
  handleClickUpdate(e) {

    let { items, activeIndex, subject, mark, } = this.state;
    items[activeIndex] = { subject: subject, mark: mark }
    this.setState({
      items: items,
      isUpdate: false,
      subject: '',
      mark: '',
      totalMark: Number(this.state.totalMark) + Number(this.state.mark),
      persentage: (Number(this.state.totalMark) + Number(this.state.mark)) / (items.length)
    })
  }

  render() {
    const { isUpdate } = this.state;
    return (
      <>
        <div className="main_class">
          <h2> Student Subject Wise Marks </h2>
          <br />
          <label> Subject : </label>
          <input type='text' value={this.state.subject} onChange={this.handleSubjectChange} required />
          <label> Mark : </label>
          <input type='number' min="0" max="100" value={this.state.mark} onChange={this.handleMarkChange} required />&nbsp;
          {isUpdate ? <button onClick={this.handleClickUpdate} > Update </button> : <button onClick={this.handleClickAdd} > ADD </button>}
        </div>
        <br /><br />
        <div className="table_div" >
          <div className="details" >
            <h1> Cousin brother`s school</h1>
            <p>student life is golden life</p>
            <p><b>Name :</b><u>Rachhadiya meetuben Vipulbhai</u></p>
            <p style={{ display: "inline", align: "left" }} ><b>Std.:</b> 9<sup>th</sup></p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <p style={{ display: "inline", align: " center" }} ><b>Div :</b>B</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <p style={{ display: "inline", align: "right" }} ><b>Roll no. :</b>46</p><br />
            <p style={{ display: "inline", align: "left" }} ><b>totalmark :</b>
              {this.state.totalMark}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p style={{ display: "inline", align: "right" }} ><b>Persentage :</b>
              {
                this.state.persentage
              }
            </p><br />
          </div><br />

          <table>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Subject</th>
                <th>Mark</th>
                <th colSpan="2" >Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((item, i) => {
                return (
                  <tr key={i} >
                    <td  >{i + 1}</td>
                    <td>{item.subject}</td>
                    <td>{item.mark}</td>
                    <td>
                      <EditIcon onClick={() => this.handleEdit(i)} className="edit" /> </td><td>
                      <HighlightOffIcon onClick={() => this.handleDeleteRow(i)} className="Delete" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}
