import { Box, Divider, Grid, Typography } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Content from '../../components/Content';
import { useAppSelector } from '../../store/store';
import { Blog } from '../../types';
import config from '../../utils/config';
import { formatDateTime } from '../../utils/helpers';
import { blogs } from "../../__mocks__/blogs";



const ViewBlog = () => {

    const { id } = useParams();

    return (
        <>
            <Content padding>

                <Grid container  >
                    <Grid item lg={12} >

                        <h2>Demo blog post</h2>
                        <h6>
                            <a href="#" >Admin</a> -{formatDateTime(blogs.createdAt)}
                        </h6>
                    </Grid>
                       <Grid item lg={12}>
                        <img src="https://source.unsplash.com/user/wsanter" height="50%" width="50%" />
                        <div dangerouslySetInnerHTML={{ __html: blogs.description }}></div>
                    </Grid>
                </Grid>
            </Content>
        </>

    )
}

export default ViewBlog