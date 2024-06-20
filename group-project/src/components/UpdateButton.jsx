import { Update } from '@mui/icons-material'
import { React } from 'react'
import { Button, Tooltip } from 'react-bootstrap'

export default function UpdateButton(props) {
  return (
    <div>
    <Tooltip title={"Update " + props.type}><Button className="btn btn-secondary trip-button" size="sm" onClick=""><Update/></Button></Tooltip>
    </div>
  )
}
