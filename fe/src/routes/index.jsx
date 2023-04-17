import AdminPage from "~/pages/AdminPage";
import AdminLab from "~/pages/AdminPage/AdminLab";
import LabDetails from "~/pages/AdminPage/AdminLab/AdminLabDetails";
import AdminFactory from "~/pages/AdminPage/AdminFactory";
import FactoryDetails from "~/pages/AdminPage/AdminFactory/AdminFactoryDetails";
import AdminGuarantee from "~/pages/AdminPage/AdminGuarantee";
import GuaranteeDetails from "~/pages/AdminPage/AdminGuarantee/AdminGuaranteeDetails";
import Books from "~/pages/AdminPage/AdminBook";
import AdminUser from "~/pages/AdminPage/AdminUser";
import UserAdminDetails from "~/pages/AdminPage/AdminUser/UserAdminPage";
import UserLabDetails from "~/pages/AdminPage/AdminUser/UserLabPage";
import UserFactoryDetails from "~/pages/AdminPage/AdminUser/UserFactoryPage";
import UserGuaranteeDetails from "~/pages/AdminPage/AdminUser/UserGuaranteePage";
import LabPage from "~/pages/LabPage";
import LabDelivery from "~/pages/LabPage/LabDelivery";
import LabGuarantee from "~/pages/LabPage/LabGuarantee";
import LabImport from "~/pages/LabPage/LabImport";
import LabBook from "~/pages/LabPage/LabBook";
import LabSold from "~/pages/LabPage/LabSold";
import LabStorage from "~/pages/LabPage/LabStorage";
import FactoryPage from "~/pages/FactoryPage";
import FactoryDelivery from "~/pages/FactoryPage/FactoryDelivery";
import FactoryExport from "~/pages/FactoryPage/FactoryExport";
import FactoryGuarantee from "~/pages/FactoryPage/FactoryGuarantee";
import FactoryImport from "~/pages/FactoryPage/FactoryImport";
import FactoryStorage from "~/pages/FactoryPage/FactoryStorage";
import GuaranteePage from "~/pages/GuaranteePage";
import GuaranteeDelivery from "~/pages/GuaranteePage/GuaranteeDelivery";
import GuaranteeBook from "~/pages/GuaranteePage/GuaranteeBook";
import LoginPage from "~/pages/LoginPage";

const publicRoutes = [
    {
        path: '/',
        component: LoginPage,
    },
];

const privateAdminRoutes = [
    // Admin page
    {
        path: '/Admin',
        component: AdminPage,
    },
    {
        path: '/Admin/user',
        component: AdminUser,
    },
    {
        path: '/Admin/adminUsers',
        component: UserAdminDetails,
    },
    {
        path: '/Admin/labUsers',
        component: UserLabDetails,
    },
    {
        path: '/Admin/guaranteeUsers',
        component: UserGuaranteeDetails,
    },
    {
        path: '/Admin/factoryUsers',
        component: UserFactoryDetails,
    },
    {
        path: '/Admin/factory',
        component: AdminFactory,
    },
    {
        path: '/Admin/factory/:id',
        component: FactoryDetails,
    },
    {
        path: '/Admin/lab',
        component: AdminLab,
    },
    {
        path: '/Admin/lab/:id',
        component: LabDetails,
    },
    {
        path: '/Admin/guarantee',
        component: AdminGuarantee,
    },
    {
        path: '/Admin/guarantee/:id',
        component: GuaranteeDetails,
    },
    {
        path: '/Admin/books',
        component: Books,
    },
];

const privateFactoryRoutes = [
    {
        path: '/Factory',
        component: FactoryPage,
    },
    {
        path: '/Factory/storage',
        component: FactoryStorage,
    },
    {
        path: '/Factory/import',
        component: FactoryImport,
    },
    {
        path: '/Factory/export',
        component: FactoryExport,
    },
    {
        path: '/Factory/delivery',
        component: FactoryDelivery,
    },
    {
        path: '/Factory/guarantee',
        component: FactoryGuarantee,
    },
];

const privateLabRoutes = [
    {
        path: '/Lab',
        component: LabPage,
    },
    {
        path: '/Lab/book',
        component: LabBook,
    },
    {
        path: '/Lab/storage',
        component: LabStorage,
    },
    {
        path: '/Lab/import',
        component: LabImport,
    },
    {
        path: '/Lab/sold',
        component: LabSold,
    },
    {
        path: '/Lab/delivery',
        component: LabDelivery,
    },
    {
        path: '/Lab/guarantee',
        component: LabGuarantee,
    },
];

const privateGuaranteeRoutes = [
    {
        path: '/',
        component: GuaranteePage,
    },
    {
        path: '/Guarantee',
        component: GuaranteePage,
    },
    {
        path: '/Guarantee/delivery',
        component: GuaranteeDelivery,
    },
    {
        path: '/Guarantee/book',
        component: GuaranteeBook,
    },
];



export { publicRoutes, privateAdminRoutes, privateFactoryRoutes, privateLabRoutes,  privateGuaranteeRoutes};
