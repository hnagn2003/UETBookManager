import { Box, Skeleton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import penaltyImage from '~/assets/image/penaltylogo.jpg';

function Penalty() {
    const [rentPenalty, setRentPenalty] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5002/rentPenalty/${localStorage.getItem('idPage')}`);
                console.log(res.data);
                setRentPenalty(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundColor: '#fff',
                    width: 'calc(100% - var(--default-layout-width-sidebar))',
                    height: 'calc(100vh - var(--default-layout-height-header))',
                    float: 'right',
                    overflowY: 'scroll',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                    {rentPenalty ? (
                        <>
                            <Card sx={{ maxWidth: 750, margin: '0 20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={penaltyImage}
                                        alt="Image"
                                        backgroundColor="black"
                                    />
                                    <CardContent>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            {rentPenalty.name}
                                        </Typography>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            {rentPenalty.address}
                                        </Typography>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            Hoạt động: Thứ 2 - Thứ 7 (7h -22h)
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </>
                    ) : (
                        <>
                            <Stack>
                                <Skeleton variant="rounded" width={400} height={400} />
                            </Stack>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
}

export default Penalty;
