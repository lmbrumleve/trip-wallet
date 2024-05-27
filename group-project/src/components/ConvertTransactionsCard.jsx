import { Box } from '@mui/material'
import React from 'react'
import { Card } from 'react-bootstrap'
import ConvertTransactions from "./ConvertTransactions.jsx"

export default function ConvertTransactionsCard() {
  return (
    <>
    <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "32px 64px",
            gap: "16px",
          }}
    >
    <Card style={{ width: '50rem' }} className='shadow'>
    <Card.Body>
          <ConvertTransactions/>
    </Card.Body>
    </Card>
    </Box>
    </>
  )
}
