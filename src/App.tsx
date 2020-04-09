import React, { Fragment } from "react";
import "./App.css";
import IPageInformation from "./Models/IPageInformation";
import UserService from "./Services/UserService";
import Users from "./Components/Users/Users";
import Loader from "./Components/Loader/Loader";

interface IAppState {
  pageInformation: IPageInformation;
  isLoading: boolean;
}

class App extends React.Component<{}, IAppState> {
  private service: UserService;

  constructor(props: any) {
    super(props);
    this.service = new UserService();
    this.loadMore = this.loadMore.bind(this);
    this.loader = this.loader.bind(this);

    this.state = {
      pageInformation: {
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
        data: []
      },
      isLoading: true
    };
  }

  loader() {
    setTimeout(() => {
      this.setState({ isLoading: !this.state.isLoading });
    }, 3000);
  }

  async componentDidMount() {
    let pageData = await this.service.getUsers(1);

    this.loader();

    window.addEventListener("scroll", this.loadMore);

    this.setState({
      pageInformation: {
        page: pageData.page,
        per_page: pageData.per_page,
        total: pageData.total,
        total_pages: pageData.total_pages,
        data: pageData.data
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
  }

  async loadMore() {
    let scrollPosition = window.scrollY + window.innerHeight;
    let documentHeight = document.body.scrollHeight;

    if (documentHeight - 50 < scrollPosition) {
      if (
        this.state.pageInformation.page !==
        this.state.pageInformation.total_pages
      ) {
        let pageData = await this.service.getUsers(
          this.state.pageInformation.page + 1
        );

        let users = [...this.state.pageInformation.data, ...pageData.data];

        this.setState({
          pageInformation: {
            page: pageData.page,
            per_page: pageData.per_page,
            total: pageData.total,
            total_pages: pageData.total_pages,
            data: users
          }
        });
      }
    }
  }

  render() {
    let isAllLoaded = <div></div>;
    if (
      this.state.pageInformation.page === this.state.pageInformation.total_pages
    ) {
      isAllLoaded = (
        <div className="allIsLoadedContainer">
          <h2 className="allIsLoadedText">No more users to be loaded</h2>
        </div>
      );
    }
    return (
      <div className="App">
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <Fragment>
            <Users users={this.state.pageInformation.data} />
            {isAllLoaded}
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
