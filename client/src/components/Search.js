import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { searchGraph, scalePlanets, loadGraph, SearchMethod, searchMethod } from '../actions'
import { Input, Grid, Button, Dropdown, Header, Select, Icon, Label } from 'semantic-ui-react'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const Search = ({ query, onSearchChange, onSearchMethodChange, searchMethod, loading, project, projects, loadGraph }) => (
	<div style={{ width: '100%', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', pointerEvents: 'auto' }}>
		<div><Header style={{ fontWeight: 100, margin: 0 }}  as='h1'>Code Graph - <Dropdown inline placeholder='Select Project' options={projects} value={project.value} onChange={(e, data) => loadGraph(data)} /></Header></div>
		<Input type='text' loading={loading} placeholder='Search...' icon='search' style={{ marginBottom: 20, width: '100%' }} size='big' value={query} onChange={onSearchChange} action>
			<input />
			<Select textAlign='right' options={[{
				text: <div style={{ whiteSpace: 'nowrap' }}><Label color='blue'>{'Module'}</Label>—<Label>{'Neighbours'}</Label></div>, value: SearchMethod.NEIGHBOURS
			},{
				text: <div style={{ whiteSpace: 'nowrap' }}><Label color='blue'>{'Module'}</Label><Label basic size='tiny'>— required for →</Label><Label>{'Module'}</Label></div>, value: SearchMethod.PARENTS
			}, {
				text: <div style={{ whiteSpace: 'nowrap' }}><Label color='blue'>{'Module'}</Label><Label basic size='tiny'>— depends on →</Label><Label>{'Module'}</Label></div>, value: SearchMethod.CHILDREN
			}, {
				text: <div style={{ whiteSpace: 'nowrap' }}><Label color='green'>{'From'}</Label>→<Label>{'*'}</Label>→<Label color='red'>{'To'}</Label></div>, value: SearchMethod.PATH
			}, {
				text: <div><Label color='red'>{'Cycles'}</Label></div>, value: SearchMethod.CYCLES
			}, {
				text: <div><Label color='red'>{'Orphans'}</Label></div>, value: SearchMethod.ORPHANS
			}]} value={searchMethod} onChange={onSearchMethodChange} />
		</Input>
	</div>
)

Search.propTypes = {
	query: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	projects: PropTypes.array
}

const mapStateToProps = (state) => ({
	query: state.graph.query,
	loading: state.graph.loading,
	project: state.graph.project,
	projects: state.configuration.projects,
	searchMethod: state.graph.searchMethod
})

const mapDispatchToProps = ({
	onSearchChange: (event) => searchGraph(event.target.value),
	onSearchMethodChange: (event, data) => searchMethod(data.value),
	loadGraph 
})

const ConnectedSearch = connect(
	mapStateToProps,
	mapDispatchToProps
)(Search)

export default ConnectedSearch
