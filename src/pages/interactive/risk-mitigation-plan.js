import React from "react";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";
import Typography from '@material-ui/core/Typography';

import { getToolData, saveToolData, toggleEditingTool } from "../../redux/actions";

import RiskMitigationPlan from "../../components/interactiveTools/RiskMitigationPlan";

const TOOL_TYPE = 'Risk Mitigation Plan Worksheet'

class RiskMitigationPlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const queryString = this.props.location.search;
    const params = new URLSearchParams(queryString);
    let toolId = params.get("id");
    if (toolId) {
      this.props.getToolData(toolId);
      this.setState({ toolId });
    };
  }

  saveTool = input => {
    const newData = { ...this.props.toolData, ...input };
    const slug = this.props.location.pathname;
    const toolId = this.state.toolId || uuidv4();
    this.props.saveToolData(toolId, newData, slug, TOOL_TYPE);
    this.props.history.push(`${this.props.history.location.pathname}?id=${toolId}`)
  };

  render() {
    const toolData = this.props.toolData || {};
    const fields = toolData.fields;
    const title = toolData.title;

    return (
      <div className="interactive-tool">
        <div className="title">
          <Typography variant="display1" gutterBottom>{TOOL_TYPE}</Typography>
        </div>
        <RiskMitigationPlan
          tableData={fields}
          title={title}
          handleSave={this.saveTool}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEditing: state.interactiveTool.isEditing,
    toolData: state.interactiveTool.toolData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToolData: id => {
      dispatch(getToolData(id));
    },
    saveToolData: (id, data, slug, type) => {
      dispatch(saveToolData(id, data, slug, type));
    },
    toggleEditingTool: () => {
      dispatch(toggleEditingTool());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RiskMitigationPlanPage);
