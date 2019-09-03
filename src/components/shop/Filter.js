import React, { Component } from 'react';
import {
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from 'reactstrap';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.state = {
        dropdownOpen: false,
        splitButtonOpen: false,
        category: 'Todas las Categorias',
        categories: ["Baby", "Movies", "Shoes", "Books", "Electronics","Computers", "Kids"],
        filter: ''
        };
    }

    toggleDropDown() {
        this.setState({
        dropdownOpen: !this.state.dropdownOpen
        });
    }

    async clickDropdown(e, input = false){
        if(!input){
            await this.setState({category: e.target.name})
        }else{
            this.setState({filter: e.target.value})
        }
        this.props.filter(this.props.perPage,this.props.currentPage,this.state.filter.length > 1 ? this.state.filter :'',this.state.category === 'Todas las Categorias' ? '' : this.state.category)
    }
    render() {
        const { category, categories } = this.state
        return (
            <div>
                <InputGroup>
                    <Input placeholder="Buscar" value={this.state.filter} onChange={(c) => this.clickDropdown(c, true)} />
                    <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                        <DropdownToggle caret>
                        {category}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={(c) => this.clickDropdown(c)} name='Todas las Categorias'>Todas las Categorias</DropdownItem>
                        {
                            categories.map((c, key) => (
                                <div key={key}>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={(c) => this.clickDropdown(c)} name={c}>{c}</DropdownItem>
                                 </div>
                             ))
                        }
                        </DropdownMenu>
                    </InputGroupButtonDropdown>
                </InputGroup>
            </div>
        );
    }
}
export default Filter;