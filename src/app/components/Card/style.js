import styled from "styled-components";

export const CardWrapper = styled.div`
    display: flex;
    background-color: #fff;
    border-radius: 25px;
    width: 100%;
    h1{
        font-weight: 800;
        font-size: 24px;
        line-height: 36px;
        color: #1A1A1A;
    }
    .card-section{
        flex: 1;
        padding: 20px;
    };
    .card-section:not(:last-child){
        border-right: 1px solid #E0E0E0;
    }
    .first{
       display: flex;
       flex-direction: column;
    }
    .second{
        h4{
            color: #666666;
        };
        .number{
            color: #0057D1;
        }
        .second-content{
            text-align: center;
        }
    }
    .delayed{
        color: #CC3333;
        background-color: #F5C2B5;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
    }
`;