import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchGraph, scalePlanets } from '../actions'
import { Input, Grid, Button, Dropdown, Header } from 'semantic-ui-react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const Search = ({ query, onSearchChange, loading }) => (
	<div style={{ width: '100%', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', pointerEvents: 'auto' }}>
		<div><Header style={{ fontWeight: 100, margin: 0 }}  as='h1'>Code Graph - <Dropdown inline placeholder='Select Project' options={[{ text: 'YUI', value: 'YUI' }]} /></Header></div>
		<Input loading={loading} placeholder='Search...' icon='search' style={{ marginBottom: 20, width: '100%' }} size='big' value={query} onChange={onSearchChange} />
	</div>
)

Search.propTypes = {
	query: PropTypes.string.isRequired,
	loading: PropTypes.bool
}

const mapStateToProps = (state) => ({
	query: state.graph.query,
	loading: state.graph.loading
})

const mapDispatchToProps = ({
	onSearchChange: (event) => searchGraph(event.target.value)
})

const ConnectedSearch = connect(
	mapStateToProps,
	mapDispatchToProps
)(Search)

export default ConnectedSearch
