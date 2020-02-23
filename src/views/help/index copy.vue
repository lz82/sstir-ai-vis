<template>
  <div class="intro-wrapper">
    <div class="item-wrapper">
      <h1 class="title">
          Public R & D Resource Graph of AI in Shanghai Product Manual
      </h1>
      <ul>
        <li>
          <h4 class="sub-title">
            Product Introduction
          </h4>
          <div class="content">
            <p>Shanghai Science and Technology Innovation Resources  Center focuses on the core goal of building the Shanghai artificial intelligence industry highland, researching and launching a tool-based data support platform for the innovation main body of artificial intelligence industry--Public R & D Resource Graph of Artificial Intelligence in Shanghai V1.0.The platform focuses on the integration of various scientific research resources in AI filed and gathering the professional data over 100 million levels . For providing the industrial development with a better data retrieval and support service, the platform takes subject words in the field of AI as the core, gets through relevant R&D resource data such as expert talents, scientific literature, patent achievements, scientific research institutions, and provides a better one-stop search experience and intelligent association recommendation with the graph demonstrating the relationship between those resources so as to improve the research resource preparation efficiency of various innovative subjects in the field of AI. In the future, the platform will continue to expand and integrate a wider range of scientific research resource data sources, provide trend analysis of deep academic indicators based on artificial intelligence algorithms as well as data mining, and provide decision-making reference for resource allocation in the artificial intelligence industry.</p>
          </div>
        </li>
        <li>
          <h4 class="sub-title">
            Instructions
          </h4>
          <div class="content">
            <p>
              Public R & D Resource Graph of Artificial Intelligence in Shanghai V1.0 includes data retrieval, relationship Graph display and visual analysis of various scientific research resources based on artificial intelligence research.
            </p>
            <p>
              Scientific research resource searches can be searched for terms such as expert names, subject vocabulary.
            </p>
            <p>
              Visual Report includes Seven topics: experts, articles , projects, patents, investments,  transaction in technology and enterprise.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot1.jpg'>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 检索功能 -->
    <div class="item-wrapper">
      <h1 class="title">
          Search function
      </h1>
      <ul>
        <li>
          <!-- <h4 class="sub-title">
            Instructions
          </h4> -->
          <div class="content">
            <p>
              Search for keywords on the home page, you can find the Knowledge Graph, related articles , related patents, subject standards etc. The Knowledge Graph can be viewed by experts (blue), subjects (green), affiliated institutions (orange), etc. Size represents the strength of relevance.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot2.jpg'>
            </div>
            <p>
              Some keywords will also show you expert profiles, Knowledge Graph, patent documents and more. The expert profile includes information such as the name of the expert, the graduate school, the research field, the affiliation, the total number of posts, the total citation, the first 1% high citation, the H index, etc. Click on the lower right corner of the section [Learn More] to see the visualization. The number of journals published, the citation of articles, the matching degree of key disciplines, etc.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot3.png'>
            </div>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot4.png'>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 可视化报告 -->
    <div class="item-wrapper">
      <h1 class="title">
          Visual Report
      </h1>
      <ul>
        <li>
          <!-- <h4 class="sub-title">
            Instructions
          </h4> -->
          <div class="content">
            <p>
              Visual Report includes Seven modules of experts, articles , projects, patents, investments,  transaction in technology and enterprise.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot5.jpg'>
            </div>
            <p>
              The thesis module can view the paper distribution and growth trend in the sub-direction of artificial intelligence in 2016-2018.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot6.jpg'>
            </div>
            <p>
              Expert module can view the trend of expert holdings and expert recommendation in each sub-direction of artificial intelligence in 2016-2018.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot7.jpg'>
            </div>
            <p>
              The project module can view the distribution of enterprises participating in government projects in the field of artificial intelligence and the growth trend of enterprises, and can view the specific growth trend of each sub-direction in the field.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot8.jpg'>
            </div>
            <p>
              The transaction in technology module includes the contract distribution of the artificial intelligence field participating in the transaction  and the growth trend of each sub-direction.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot9.jpg'>
            </div>
            <p>
              The patent module includes the patent distribution and patent growth trend in the field of artificial intelligence in 2016-2018NMN.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot10.jpg'>
            </div>
            <p>
              The investment module includes the investment quota and investment quota growth of artificial intelligence in various industries and the recommendation of investment institutions.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot11.png'>
            </div>

            <p>
              The enterprise module includes the high-tech companies in the field of articial intelligence and their development.
            </p>
            <div class="img-wrapper">
              <img width='70%' src='./imgs/sshot12.png'>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IntroPage'
}
</script>
<style lang='less' scoped>
.intro-wrapper{
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 15px 40px 15px;
  .item-wrapper{
    padding:20px 0;
    .title{
      margin-top:15px;
      margin-bottom:50px;
      font-size: 28px;
      font-weight: 700;

    }
    .sub-title{
      margin: 25px 0;
      font-size: 24px;
    }
    .content{
      font-size: 16px;
      line-height: 27px;
      color: #333;
      table-layout: fixed;
      word-wrap: break-word;
      word-break: normal;
      text-align:justify;
      text-justify:inter-ideograph;
    }
    .img-wrapper{
      display: flex;
      justify-content: center;
      padding: 30px 0;
      img{
        box-shadow: 0px 9px 26.88px 5.12px rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
