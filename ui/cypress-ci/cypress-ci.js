import React from 'react'
import Status from './status'

class CypressCi extends React.Component {
    loadBuildsForCurrentBranch() {
        this.props.getCypressBuilds()
    }

    componentDidMount() {
        this.loadBuildsForCurrentBranch()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentBranchName !== this.props.currentBranchName) {
            this.loadBuildsForCurrentBranch()
        }
    }

    render() {
        const { data, callBack } = this.props
        return (
            <div className="cypressCi">
                <button onClick={callBack}>Run Cypress Tests</button>
                {data.map((item) => (
                    <Status
                        commitId={item.sourceVersion}
                        result={item.result}
                        status={item.status}
                        commitBuildHref={item._links.web.href}
                    />
                ))}
            </div>
        )
    }
}

export default CypressCi
