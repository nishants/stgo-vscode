import React, {Component} from 'react';

export default function withBranchChange(WrappedCompnent){
    return class extends Component{
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            this.props.onBranchChange(this.props.selectedBranch);
        }

        componentDidUpdate(prevProps) {
            if (prevProps.selectedBranch !== this.props.selectedBranch) {
                this.props.onBranchChange(this.props.selectedBranch);
            }
        }
        
        render(){
            return (
                <WrappedCompnent {...this.props} />
            );
        }
    };
}