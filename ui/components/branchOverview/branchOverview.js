import React from 'react';

class BranchOverview extends React.Component {
    state = {
        branchData: {}
    };
    componentDidMount() {
        window.addEventListener('message', event => {
        const message = event.data;

        if(message.messageId === 'set-pull-request') {
            this.setState({ branchData: message.data});
        }
        });
        this.props.getBranchDetails(this.props.selectedBranch);

    }
    componentDidUpdate(prevProps) {
        if(prevProps.selectedBranch !== this.props.selectedBranch) {
            this.props.getBranchDetails(this.props.selectedBranch);
        }
    }
    render() {
        const { selectedBranch} = this.props;
        const { branchData} = this.state;

        if(!branchData || !branchData.status) {
            return null;
        }
        return (<div>
            <div> Selected Branch : {selectedBranch}</div>
            <div>Pull Request: <a href={branchData.url}>#{branchData.pullRequestId}</a></div>
            <div>Title: {branchData.title}</div>
            <div>Description:
                <div>{branchData.description}</div>
            </div>
        </div>);
    }
}

export default BranchOverview;