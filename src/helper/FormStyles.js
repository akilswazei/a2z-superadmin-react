import React from 'react'

export default function formStyles() {
  const datagridSx = {
    '& .MuiDataGrid-virtualScrollerRenderZone': {
      '& .MuiDataGrid-row': {
        '&:nth-of-type(2n)': {
          backgroundColor: '#F9F9FC',
          border: 'none',
        },
        '&:nth-of-type(2n-1)': {
          backgroundColor: '#f2f4ffc8',
          border: 'none',
        },
      },
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'rgba(255,255,255)',
      border: 'none',
      color: 'rgba(180,182,193)',
      fontSize: '1.2em',
      fontWeight: '700',
      textTransform: 'capitalize',
    },
    '& .MuiDataGrid-row': {
      fontSize: '0.9em',
      fontWeight: '600',
      border: 'none',
    },
    '& .css-i4bv87-MuiSvgIcon-root': {
      color: '#1976D2',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .customTable .MuiDataGrid-root .MuiDataGrid-root--densityStandard': {
      border: '0px solid gray !important',
    },
    '& .MuiDataGrid-footerContainer': {
      border: 'none',
      '& .MuiTablePagination-root': {
        display: 'none',
      },
    },
    '& .MuiButtonBase-root .MuiListItem-root .MuiListItem-button .Navlist-nested-10': {
      paddingLeft: '16px',
    },
  }
  return datagridSx
}
