import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

function SideBarPenalty() {
    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    backgroundColor: '#3c4b64',
                    width: 'var(--default-layout-width-sidebar)',
                    float: 'left',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#303c54',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'var(--default-layout-height-header)',
                        marginBottom: '20px'
                    }}
                >
                    <Typography variant="h4" sx={{}}>
                        Penalty
                    </Typography>
                </Box>
                <Box
                    sx={{
                        color: '#fff',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'var(--default-layout-height-header)',
                    }}
                >
                    <NavLink to="/penalty/delivery" className="SideBarPenalty__link">
                        <Inventory2OutlinedIcon className="SideBarPenalty__link-icon" />
                        Sản phẩm được gửi
                    </NavLink>
                    <NavLink to="/penalty/book" className="SideBarPenalty__link">
                        <WorkspacePremiumOutlinedIcon className="SideBarPenalty__link-icon" />
                        Đang bảo hành
                    </NavLink>
                </Box>
            </Box>
        </>
    );
}

export default SideBarPenalty;
